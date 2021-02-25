import { Command, flags } from '@oclif/command';
import { cli } from 'cli-ux';
import * as fs from 'fs-extra';
import * as micromatch from 'micromatch';

import Skar from '../core/Skar';
import { file, verbose } from '../flags';
import { SkarFile } from '../types';

export default class Delete extends Command {
	static description = 'delete from the archive';

	static flags = {
		help: flags.help({ char: 'h' }),
		file: file(),
		verbose,
	};

	static args = [
		{
			name:        'pattern',
			description: 'delete all files from the archive that match the given pattern',
			required:    true,
		},
	];

	static aliases = ['del', 'remove', 'rm'];

	async run() {
		const { argv, flags } = this.parse(Delete);
		const { file: archiveFile, verbose } = flags;

		const fileExists = await fs.pathExists(archiveFile!);
		if (!fileExists) throw Error('Archive file not found!');

		if (verbose) cli.action.start('Deleting files from archive');

		const files = await Skar.readArchive(archiveFile!);

		const micromatchOptions = {
			dot:           true,
			matchBase:     false,
			nobrace:       true,
			nocase:        true,
			noext:         true,
			noglobstar:    true,
			posix:         true,
			strictSlashes: false,
		};

		const newFiles = files.filter(async file => {
			const keep = !micromatch.isMatch(file.header.path, argv, micromatchOptions);
			if (verbose && !keep) cli.action.start('Deleting files from archive', file.header.path);
			return keep;
		});

		await Skar.writeArchive(archiveFile!, newFiles);

		if (verbose) cli.action.stop();
	}
}
