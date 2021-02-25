import { Command, flags } from '@oclif/command';
import { cli } from 'cli-ux';
import * as fs from 'fs-extra';

import Skar from '../core/Skar';
import { file, verbose } from '../flags';
import { SkarFile } from '../types';

export default class Append extends Command {
	static description = 'append files to the end of an archive';

	static flags = {
		help: flags.help({ char: 'h' }),
		file: file(),
		verbose,
	};

	static args = [
		{
			name:        'file',
			description: 'append given files or folders to the archive',
			required:    true,
		},
	];

	static strict = false;

	static aliases = ['a', 'r'];

	async run() {
		const { argv, flags } = this.parse(Append);
		const { file: archiveFile, verbose } = flags;

		const fileExists = await fs.pathExists(archiveFile!);
		if (!fileExists) throw Error('Archive file not found!');

		if (verbose) cli.action.start('Appending files to archive');

		const collectedFiles = await Skar.collectFiles(argv);
		const files = await Skar.readArchive(archiveFile!);

		for (let file of collectedFiles) {
			let exists = false;
			for (let i = 0; i < files.length; i++) {
				if (file.header.path === files[i].header.path) {
					exists = true;
					break;
				}
			}

			if (!exists) {
				files.push(file);
				if (verbose) cli.action.start('Appending files to archive', file.header.path);
			}
		}

		await Skar.writeArchive(archiveFile!, files);

		if (verbose) cli.action.stop();
	}
}
