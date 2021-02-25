import { Command, flags } from '@oclif/command';
import * as fs from 'fs-extra';
import { cli } from 'cli-ux';

import Skar from '../core/Skar';
import { file, verbose } from '../flags';

export default class Update extends Command {
	static description = 'only append files newer than copy in archive';

	static flags = {
		help: flags.help({ char: 'h' }),
		file: file(),
		verbose,
	};

	static args = [
		{
			name:        'file',
			description: 'update given files or folders in the archive',
			required:    true,
		},
	];

	static strict = false;

	static aliases = ['u'];

	async run() {
		const { argv, flags } = this.parse(Update);
		const { file: archiveFile, verbose } = flags;

		const fileExists = await fs.pathExists(archiveFile!);
		if (!fileExists) throw Error('Archive file not found!');

		if (verbose) cli.action.start('Updating archive');

		const collectedFiles = await Skar.collectFiles(argv);
		const files = await Skar.readArchive(archiveFile!);

		for (let file of collectedFiles) {
			for (let i = 0; i < files.length; i++) {
				if (file.header.path === files[i].header.path &&
				    file.header.mtime > files[i].header.mtime) {
					if (verbose) cli.action.start('Updating archive', file.header.path);
					files[i] = file;
				}
			}
		}

		await Skar.writeArchive(archiveFile!, files);

		if (verbose) cli.action.stop();
	}
}
