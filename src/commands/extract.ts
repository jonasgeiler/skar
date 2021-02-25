import { Command, flags } from '@oclif/command';
import { cli } from 'cli-ux';
import * as fs from 'fs-extra';
import { resolve } from 'path';

import Skar from '../core/Skar';
import { file, verbose } from '../flags';

export default class Extract extends Command {
	static description = 'extract files from an archive';

	static flags = {
		help: flags.help({ char: 'h' }),
		file: file(),
		verbose,

		dest: flags.string({
			char: 'd',
			description: 'output directory (defaults to current directory)',
			default: '.'
		})
	};

	static aliases = ['e', 'x'];

	async run() {
		const { flags } = this.parse(Extract);
		const { file: archiveFile, verbose } = flags;

		const cwd = process.cwd();
		const outputDir = resolve(cwd, flags.dest);

		if (verbose) cli.action.start('Extracting files from archive');

		const files = await Skar.readArchive(archiveFile!);

		for (let { header, data } of files) {
			const { path, mode, uid, gid, mtime } = header;

			if (verbose) cli.action.start('Extracting files from archive', path);

			const outputPath = resolve(outputDir, path);

			await fs.outputFile(outputPath, data, {
				mode: mode & 0o777
			});
			await fs.chown(outputPath, uid, gid);
			await fs.utimes(outputPath, new Date(), new Date(Number(mtime)));
		}

		if (verbose) cli.action.stop();
	}
}
