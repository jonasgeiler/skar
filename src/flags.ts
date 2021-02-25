import { flags } from '@oclif/command';
import { resolve } from 'path';

const cwd = process.cwd();

export const file = flags.build({
	char:        'f',
	description: 'archive file to use',
	required:    true,
	parse:       file => resolve(cwd, file),
});

export const verbose = flags.boolean({
	char:        'v',
	description: 'show more verbose information',
	default:     false,
});
