import { Parser as BinaryParserEncoder } from 'binary-parser-encoder';

export const FileHeaderParserEncoder = new BinaryParserEncoder()
	.uint16('pathLength')
	.string('path', {
		length: 'pathLength'
	})
	.uint32('mode')
	.uint32('uid')
	.uint32('gid')
	.int64('mtime')
	.uint32('size');

export const FileParserEncoder = new BinaryParserEncoder()
	.nest('header', {
		type: FileHeaderParserEncoder,
	})
	.buffer('data', {
		length: 'header.size',
	});

export const SkarParserEncoder = new BinaryParserEncoder()
	.uint16('signature')
	.uint8('version')
	.array('files', {
		type:      FileParserEncoder,
		readUntil: 'eof',
	});

//console.log(SkarParserEncoder.getCode());
//console.log(SkarParserEncoder.getCodeEncode());
