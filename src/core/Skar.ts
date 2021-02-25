import * as fs from 'fs-extra';
import * as fg from 'fast-glob';

import { SkarParserEncoder } from './SkarParserEncoder';
import { SkarData, SkarFile } from '../types';
import * as micromatch from 'micromatch';

export default class Skar {
	static VERSION = 1;

	static SIGNATURE = 0x5c12;

	static MAX_FILE_SIZE = 0xffffffff;

	/**
	 * Writes a list of files to an archive file
	 * @param path
	 * @param files
	 */
	static async writeArchive(path: string, files: SkarFile[]) {
		const archiveData: SkarData = {
			signature: Skar.SIGNATURE,
			version:   Skar.VERSION,
			files,
		};
		const archiveBuffer = SkarParserEncoder.encode(archiveData);
		await fs.outputFile(path, archiveBuffer);
	}

	/**
	 * Reads and archive file and returns all files
	 * @param path
	 */
	static async readArchive(path: string): Promise<SkarFile[]> {
		const archiveBuffer = await fs.readFile(path);
		const archiveData: SkarData = SkarParserEncoder.parse(archiveBuffer);

		if (archiveData.signature !== Skar.SIGNATURE) {
			throw new Error('The signature of the archive file does not match! Please check that it is a valid skar (.skr) file.');
		} else if (archiveData.version !== Skar.VERSION) {
			throw new Error('The archive file was created using a different version of skar!');
		}

		return archiveData.files;
	}

	/**
	 * Little utility for collecting files for the archive based on one or multiple glob patterns
	 * @param pattern
	 * @param statusCallback
	 */
	static async collectFiles(pattern: string | string[], statusCallback?: (path: string) => void) {
		const foundFiles = await fg(pattern, {
			stats: true,
			dot:   true,
		});
		const collectedFiles: SkarFile[] = [];

		for (let { path, stats } of foundFiles) {
			if (statusCallback) statusCallback(path);

			const {
				mode, uid, gid, mtimeMs, size,
			} = stats!;

			if (size > Skar.MAX_FILE_SIZE) throw Error(`The file ${path} exceeds the maximum allowed file size!`);

			const data = await fs.readFile(path);

			const pathLength = path.length;
			const mtime = BigInt(Math.round(mtimeMs));

			collectedFiles.push({
				header: {
					pathLength, path, mode, uid, gid, mtime, size,
				},
				data,
			});
		}

		return collectedFiles;
	}
}
