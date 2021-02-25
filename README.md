skar
====

An awful tool I've written for collecting many files into one archive file (heavily inspired by tar)

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/skar.svg)](https://npmjs.org/package/skar)
[![Downloads/week](https://img.shields.io/npm/dw/skar.svg)](https://npmjs.org/package/skar)
[![License](https://img.shields.io/npm/l/skar.svg)](https://github.com/Skayo/skar/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g skar
$ skar COMMAND
running command...
$ skar (-v|--version|version)
skar/1.0.2 win32-x64 node-v14.16.0
$ skar --help [COMMAND]
USAGE
  $ skar COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`skar append FILE`](#skar-append-file)
* [`skar create FILE`](#skar-create-file)
* [`skar delete PATTERN`](#skar-delete-pattern)
* [`skar extract`](#skar-extract)
* [`skar help [COMMAND]`](#skar-help-command)
* [`skar list [PATTERN]`](#skar-list-pattern)
* [`skar update FILE`](#skar-update-file)

## `skar append FILE`

append files to the end of an archive

```
USAGE
  $ skar append FILE

ARGUMENTS
  FILE  append given files or folders to the archive

OPTIONS
  -f, --file=file  (required) archive file to use
  -h, --help       show CLI help
  -v, --verbose    show more verbose information

ALIASES
  $ skar a
  $ skar r
```

_See code: [src/commands/append.ts](https://github.com/Skayo/skar/blob/v1.0.2/src/commands/append.ts)_

## `skar create FILE`

create a new archive

```
USAGE
  $ skar create FILE

ARGUMENTS
  FILE  add given files or folders to the archive

OPTIONS
  -f, --file=file  (required) archive file to use
  -h, --help       show CLI help
  -v, --verbose    show more verbose information

ALIASES
  $ skar c
```

_See code: [src/commands/create.ts](https://github.com/Skayo/skar/blob/v1.0.2/src/commands/create.ts)_

## `skar delete PATTERN`

delete from the archive

```
USAGE
  $ skar delete PATTERN

ARGUMENTS
  PATTERN  delete all files from the archive that match the given pattern

OPTIONS
  -f, --file=file  (required) archive file to use
  -h, --help       show CLI help
  -v, --verbose    show more verbose information

ALIASES
  $ skar del
  $ skar remove
  $ skar rm
```

_See code: [src/commands/delete.ts](https://github.com/Skayo/skar/blob/v1.0.2/src/commands/delete.ts)_

## `skar extract`

extract files from an archive

```
USAGE
  $ skar extract

OPTIONS
  -d, --dest=dest  [default: .] output directory (defaults to current directory)
  -f, --file=file  (required) archive file to use
  -h, --help       show CLI help
  -v, --verbose    show more verbose information

ALIASES
  $ skar e
  $ skar x
```

_See code: [src/commands/extract.ts](https://github.com/Skayo/skar/blob/v1.0.2/src/commands/extract.ts)_

## `skar help [COMMAND]`

display help for skar

```
USAGE
  $ skar help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `skar list [PATTERN]`

list the contents of an archive

```
USAGE
  $ skar list [PATTERN]

ARGUMENTS
  PATTERN  only list files in the archive that match the given pattern

OPTIONS
  -f, --file=file  (required) archive file to use
  -h, --help       show CLI help
  -v, --verbose    show more verbose information

ALIASES
  $ skar ls
  $ skar l
```

_See code: [src/commands/list.ts](https://github.com/Skayo/skar/blob/v1.0.2/src/commands/list.ts)_

## `skar update FILE`

only append files newer than copy in archive

```
USAGE
  $ skar update FILE

ARGUMENTS
  FILE  update given files or folders in the archive

OPTIONS
  -f, --file=file  (required) archive file to use
  -h, --help       show CLI help
  -v, --verbose    show more verbose information

ALIASES
  $ skar u
```

_See code: [src/commands/update.ts](https://github.com/Skayo/skar/blob/v1.0.2/src/commands/update.ts)_
<!-- commandsstop -->
