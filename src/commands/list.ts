import { Command, flags } from '@oclif/command';
import { cli } from 'cli-ux';
import * as fs from 'fs-extra';
import * as micromatch from 'micromatch';

import Skar from '../core/Skar';
import { file, verbose } from '../flags';
import { formatTimestamp, formatFileMode } from '../utils';

export default class List extends Command {
	static description = 'list the contents of an archive';

	static flags = {
		help: flags.help({ char: 'h' }),
		file: file(),
		verbose,
	};

	static args = [
		{
			name:        'pattern',
			description: 'only list files in the archive that match the given pattern',
		},
	];

	static aliases = ['ls', 'l'];

	async run() {
		const { argv, flags } = this.parse(List);
		const { file: archiveFile, verbose } = flags;

		const fileExists = await fs.pathExists(archiveFile!);
		if (!fileExists) throw Error('Archive file not found!');

		let files = await Skar.readArchive(archiveFile!);

		if (argv.length > 0) {
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

			files = files.filter(file => {
				return micromatch.isMatch(file.header.path, argv, micromatchOptions)
			});
		}

		cli.table(files, {
			mode:  {
				header:   'Mode',
				get:      row => formatFileMode(row.header.mode),
				extended: true,
			},
			uid:   {
				header:   'UID',
				get:      row => row.header.uid,
				extended: true,
			},
			gid:   {
				header:   'GID',
				get:      row => row.header.gid,
				extended: true,
			},
			size:  {
				get:      row => row.header.size,
				extended: true,
			},
			mtime: {
				header:   'Last Modified',
				get:      row => formatTimestamp(row.header.mtime),
				extended: true,
			},
			file:  {
				get: row => row.header.path,
			},
		}, {
			'no-header': !verbose,
			extended:    verbose,
		});
	}
}
