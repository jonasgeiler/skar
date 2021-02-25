# skar

## General

- File Extension: `.skr`
- Mime Type: `application/x-skar`

## File Format

| SKR File Format |
|-----------------|
| Archive Header  |
| File Header 1   |
| File Data 1     |
| File Header 2   |
| File Data 2     |
| ...             |
| ...             |
| File Header n   |
| File Data n     |

### Archive Header

|  Type  | Offset | Length |          Description           |
|--------|--------|--------|--------------------------------| 
| uint16 | 0      | 2      | Signature to recognise the SKP file format, must be `0x5c12` |
| uint8  | 2      | 1      | Version of the SKP file format |

### File Header

|  Type  | Offset | Length |          Description           |
|--------|--------|--------|--------------------------------| 
| uint16 | 0      | 2      | File Path Length (n)           |
| string | 2      | n      | File Path                      |
| uint32 | n + 2  | 4      | File Mode                      | 
| uint32 | n + 6  | 4      | Owner's User ID                |
| uint32 | n + 10 | 4      | Owner's Group ID               |
| int64  | n + 14 | 8      | Timestamp of last modification |
| uint32 | n + 22 | 4      | File Size in bytes             |
