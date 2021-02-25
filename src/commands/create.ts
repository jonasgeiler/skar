import { Command, flags } from '@oclif/command';
import { cli } from 'cli-ux';
import * as fs from 'fs-extra';
import * as fg from 'fast-glob';
import { resolve } from 'path';

import Skar from '../core/Skar';
import { SkarFile } from '../types';
import { file, verbose } from '../flags';
import { Stats } from 'fs';

export default class Create extends Command {
	static description = 'create a new archive';

	static flags = {
		help: flags.help({ char: 'h' }),
		file: file(),
		verbose,
	};

	static args = [
		{
			name:        'file',
			description: 'add given files or folders to the archive',
			required:    true,
		},
	];

	static strict = false;

	static aliases = ['c'];

	async run() {
		const { argv, flags } = this.parse(Create);
		const { file: archiveFile, verbose } = flags;

		if (verbose) cli.action.start('Creating archive');

		const collectedFiles = await Skar.collectFiles(argv, path => {
			if (verbose) cli.action.start('Creating archive', path);
		});
		await Skar.writeArchive(archiveFile!, collectedFiles);

		if (verbose) cli.action.stop();
	}
}
