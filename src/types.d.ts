export interface SkarFileHeader {
	/**
	 * Length of the path (not the bytes, the actual ASCII length)
	 */
	pathLength: number

	/**
	 * The full file path with file name
	 * @example /a/b/c/foo.png
	 */
	path: string

	/**
	 * The file mode / permissions
	 * @example 0777
	 */
	mode: number

	/**
	 * The owner's user ID
	 */
	uid: number

	/**
	 * The owner's group ID
	 */
	gid: number

	/**
	 * The file size in bytes
	 */
	size: number

	/**
	 * The timestamp indicating the last time this file was modified expressed in milliseconds since the POSIX Epoch.
	 */
	mtime: BigInt
}

export interface SkarFile {
	/**
	 * The file header
	 */
	header: SkarFileHeader

	/**
	 * The file data
	 */
	data: Buffer
}

export interface SkarData {
	signature: number
	version: number
	files: SkarFile[]
}
