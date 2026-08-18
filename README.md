<div align="center">

![ArboCrafter](media/wideLogo_dark.webp#gh-light-mode-only)
![ArboCrafter](media/wideLogo_light.webp#gh-dark-mode-only)

![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
[![Npm](https://img.shields.io/badge/npm-red?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/@cafeine-software/arbo-crafter)

[Introduction](#Introduction) • [Features](#Features) • [Installation](#Installation) • [Usage](#Usage) • [License](#License) • [Author](#Author)

<br/>
</div>

# Introduction
Simple and efficient way to create a complete filetree in one function. I created it to simplify the build process of my own framework (i know this information about my life is not useful xD)

# Features
- Create the folders structure
- Create files
- Copy file
- Copy a folder with its structure
- Copy all files from a folder (flattened, without structure)

# Installation
```bash
npm i @cafeine-software/arbo-crafter
```

# Usage

```javascript
import { buildFileTree } from '@cafeine-software/arbo-crafter';

// ⬇ Define the structure of the filetree you want to create
const fileTreeStructure = {}

// ⬇ Where to create the filetree
const outputFolder = "out"

// ⬇ Will do nothing, look at examples below :)
buildFileTree(fileTreeStructure,outputFolder)
```

## Folder creation
Any object in the file tree structure definition will be considered as folder

```javascript
const fileTreeStructure = {
    folder1: {}
}

buildFileTree(fileTreeStructure,outputFolder)

// Result : 
// - Create a folder 'folder1'
```

## File creation

```javascript
const fileTreeStructure = {
    folder1:{
        'example.txt':'example content'
    }
}

buildFileTree(fileTreeStructure,outputFolder)

// Result :
// - Create a folder 'folder1'
// - Create a file 'example.txt' with content 'example content'
```

## File Copy

```javascript
const fileTreeStructure = {
    folder1:{
        'example.txt':'example content',
        '.gitignore.copy': `@.gitignore`,
    }
}

buildFileTree(fileTreeStructure,outputFolder)

// Result :
// - Create a folder 'folder1'
// - Create a file 'example.txt' with content 'example content'
// - Copy file '.gitignore' as '.gitignore.copy'
```

## Folder Copy (with structure)

Will copy the entire folder with its structure using `@`

```javascript
const fileTreeStructure = {
    folderCopy:"@../../srcFolderPath"
}

buildFileTree(fileTreeStructure,outputFolder)

// Result :
// - Copy folder '../../srcFolderPath' into 'folderCopy' keeping the directory structure
```

## Folder Copy (flattened)

Will copy all files from the source folder and its subfolders, flattened into a single directory using `@!`

```javascript
const fileTreeStructure = {
    folderFlat:"@!../../srcFolderPath"
}

buildFileTree(fileTreeStructure,outputFolder)

// Result :
// - Copy all files from '../../srcFolderPath' and its subfolders into 'folderFlat' (no subdirectories)
```

## Syntax reference

| Syntax | Type | Description |
|--------|------|-------------|
| `{ key: {} }` | Folder | Creates an empty folder |
| `{ key: { ... } }` | Folder | Creates a folder with nested content |
| `{ 'file.txt': 'content' }` | File | Creates a file with the given content |
| `{ 'file.txt': '@path' }` | File copy | Copies a file from the given path |
| `{ folder: '@path' }` | Folder copy | Copies a folder keeping its structure |
| `{ folder: '@!path' }` | Folder copy (flat) | Copies only files, flattened into one directory |

## Test

```
npm test
```


# License

![Licence](https://img.shields.io/badge/MPL%202.0-00d230?style=for-the-badge&logo=mozilla&logoColor=white)

# Author

[![Quentin Lamamy](https://img.shields.io/badge/quentin%20lamamy-000000?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzEwIiBoZWlnaHQ9IjMxMCIgdmlld0JveD0iMCAwIDMxMCAzMTAiPjxpbWFnZSB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsIGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFUWUFBQUUyQ0FZQUFBRHJ2TDZwQUFBQUFYTlNSMElBcnM0YzZRQUFBRVJsV0VsbVRVMEFLZ0FBQUFnQUFZZHBBQVFBQUFBQkFBQUFHZ0FBQUFBQUE2QUJBQU1BQUFBQkFBRUFBS0FDQUFRQUFBQUJBQUFCTnFBREFBUUFBQUFCQUFBQk5nQUFBQURYVFV2Z0FBQUkvRWxFUVZSNEFlM1V3UTBBSUF3RHNjTCtPd01QcGpnWmlRSGlWRmt6Yzk3M0NCQWdrQkhZbVNTQ0VDQkE0QXNZTnFkQWdFQk93TERsS2hXSUFBSEQ1Z1lJRU1nSkdMWmNwUUlSSUdEWTNBQUJBamtCdzVhclZDQUNCQXliR3lCQUlDZGcySEtWQ2tTQWdHRnpBd1FJNUFRTVc2NVNnUWdRTUd4dWdBQ0JuSUJoeTFVcUVBRUNoczBORUNDUUV6QnN1VW9GSWtEQXNMa0JBZ1J5QW9ZdFY2bEFCQWdZTmpkQWdFQk93TERsS2hXSUFBSEQ1Z1lJRU1nSkdMWmNwUUlSSUdEWTNBQUJBamtCdzVhclZDQUNCQXliR3lCQUlDZGcySEtWQ2tTQWdHRnpBd1FJNUFRTVc2NVNnUWdRTUd4dWdBQ0JuSUJoeTFVcUVBRUNoczBORUNDUUV6QnN1VW9GSWtEQXNMa0JBZ1J5QW9ZdFY2bEFCQWdZTmpkQWdFQk93TERsS2hXSUFBSEQ1Z1lJRU1nSkdMWmNwUUlSSUdEWTNBQUJBamtCdzVhclZDQUNCQXliR3lCQUlDZGcySEtWQ2tTQWdHRnpBd1FJNUFRTVc2NVNnUWdRTUd4dWdBQ0JuSUJoeTFVcUVBRUNoczBORUNDUUV6QnN1VW9GSWtEQXNMa0JBZ1J5QW9ZdFY2bEFCQWdZTmpkQWdFQk93TERsS2hXSUFBSEQ1Z1lJRU1nSkdMWmNwUUlSSUdEWTNBQUJBamtCdzVhclZDQUNCQXliR3lCQUlDZGcySEtWQ2tTQWdHRnpBd1FJNUFRTVc2NVNnUWdRTUd4dWdBQ0JuSUJoeTFVcUVBRUNoczBORUNDUUV6QnN1VW9GSWtEQXNMa0JBZ1J5QW9ZdFY2bEFCQWdZTmpkQWdFQk93TERsS2hXSUFBSEQ1Z1lJRU1nSkdMWmNwUUlSSUdEWTNBQUJBamtCdzVhclZDQUNCQXliR3lCQUlDZGcySEtWQ2tTQWdHRnpBd1FJNUFRTVc2NVNnUWdRTUd4dWdBQ0JuSUJoeTFVcUVBRUNoczBORUNDUUV6QnN1VW9GSWtEQXNMa0JBZ1J5QW9ZdFY2bEFCQWdZTmpkQWdFQk93TERsS2hXSUFBSEQ1Z1lJRU1nSkdMWmNwUUlSSUdEWTNBQUJBamtCdzVhclZDQUNCQXliR3lCQUlDZGcySEtWQ2tTQWdHRnpBd1FJNUFRTVc2NVNnUWdRTUd4dWdBQ0JuSUJoeTFVcUVBRUNoczBORUNDUUV6QnN1VW9GSWtEQXNMa0JBZ1J5QW9ZdFY2bEFCQWdZTmpkQWdFQk93TERsS2hXSUFBSEQ1Z1lJRU1nSkdMWmNwUUlSSUdEWTNBQUJBamtCdzVhclZDQUNCQXliR3lCQUlDZGcySEtWQ2tTQWdHRnpBd1FJNUFRTVc2NVNnUWdRTUd4dWdBQ0JuSUJoeTFVcUVBRUNoczBORUNDUUV6QnN1VW9GSWtEQXNMa0JBZ1J5QW9ZdFY2bEFCQWdZTmpkQWdFQk93TERsS2hXSUFBSEQ1Z1lJRU1nSkdMWmNwUUlSSUdEWTNBQUJBamtCdzVhclZDQUNCQXliR3lCQUlDZGcySEtWQ2tTQWdHRnpBd1FJNUFRTVc2NVNnUWdRTUd4dWdBQ0JuSUJoeTFVcUVBRUNoczBORUNDUUV6QnN1VW9GSWtEQXNMa0JBZ1J5QW9ZdFY2bEFCQWdZTmpkQWdFQk93TERsS2hXSUFBSEQ1Z1lJRU1nSkdMWmNwUUlSSUdEWTNBQUJBamtCdzVhclZDQUNCQXliR3lCQUlDZGcySEtWQ2tTQWdHRnpBd1FJNUFRTVc2NVNnUWdRTUd4dWdBQ0JuSUJoeTFVcUVBRUNoczBORUNDUUV6QnN1VW9GSWtEQXNMa0JBZ1J5QW9ZdFY2bEFCQWdZTmpkQWdFQk93TERsS2hXSUFBSEQ1Z1lJRU1nSkdMWmNwUUlSSUdEWTNBQUJBamtCdzVhclZDQUNCQXliR3lCQUlDZGcySEtWQ2tTQWdHRnpBd1FJNUFRTVc2NVNnUWdRTUd4dWdBQ0JuSUJoeTFVcUVBRUNoczBORUNDUUV6QnN1VW9GSWtEQXNMa0JBZ1J5QW9ZdFY2bEFCQWdZTmpkQWdFQk93TERsS2hXSUFBSEQ1Z1lJRU1nSkdMWmNwUUlSSUdEWTNBQUJBamtCdzVhclZDQUNCQXliR3lCQUlDZGcySEtWQ2tTQWdHRnpBd1FJNUFRTVc2NVNnUWdRTUd4dWdBQ0JuSUJoeTFVcUVBRUNoczBORUNDUUV6QnN1VW9GSWtEQXNMa0JBZ1J5QW9ZdFY2bEFCQWdZTmpkQWdFQk93TERsS2hXSUFBSEQ1Z1lJRU1nSkdMWmNwUUlSSUdEWTNBQUJBamtCdzVhclZDQUNCQXliR3lCQUlDZGcySEtWQ2tTQWdHRnpBd1FJNUFRTVc2NVNnUWdRTUd4dWdBQ0JuSUJoeTFVcUVBRUNoczBORUNDUUV6QnN1VW9GSWtEQXNMa0JBZ1J5QW9ZdFY2bEFCQWdZTmpkQWdFQk93TERsS2hXSUFBSEQ1Z1lJRU1nSkdMWmNwUUlSSUdEWTNBQUJBamtCdzVhclZDQUNCQXliR3lCQUlDZGcySEtWQ2tTQWdHRnpBd1FJNUFRTVc2NVNnUWdRTUd4dWdBQ0JuSUJoeTFVcUVBRUNoczBORUNDUUV6QnN1VW9GSWtEQXNMa0JBZ1J5QW9ZdFY2bEFCQWdZTmpkQWdFQk93TERsS2hXSUFBSEQ1Z1lJRU1nSkdMWmNwUUlSSUdEWTNBQUJBamtCdzVhclZDQUNCQXliR3lCQUlDZGcySEtWQ2tTQWdHRnpBd1FJNUFRTVc2NVNnUWdRTUd4dWdBQ0JuSUJoeTFVcUVBRUNoczBORUNDUUV6QnN1VW9GSWtEQXNMa0JBZ1J5QW9ZdFY2bEFCQWdZTmpkQWdFQk93TERsS2hXSUFBSEQ1Z1lJRU1nSkdMWmNwUUlSSUdEWTNBQUJBamtCdzVhclZDQUNCQXliR3lCQUlDZGcySEtWQ2tTQWdHRnpBd1FJNUFRTVc2NVNnUWdRTUd4dWdBQ0JuSUJoeTFVcUVBRUNoczBORUNDUUV6QnN1VW9GSWtEQXNMa0JBZ1J5QW9ZdFY2bEFCQWdZTmpkQWdFQk93TERsS2hXSUFBSEQ1Z1lJRU1nSkdMWmNwUUlSSUdEWTNBQUJBamtCdzVhclZDQUNCQXliR3lCQUlDZGcySEtWQ2tTQWdHRnpBd1FJNUFRTVc2NVNnUWdRTUd4dWdBQ0JuSUJoeTFVcUVBRUNoczBORUNDUUV6QnN1VW9GSWtEQXNMa0JBZ1J5QW9ZdFY2bEFCQWdZTmpkQWdFQk93TERsS2hXSUFBSEQ1Z1lJRU1nSkdMWmNwUUlSSUdEWTNBQUJBamtCdzVhclZDQUNCQXliR3lCQUlDZGcySEtWQ2tTQWdHRnpBd1FJNUFRTVc2NVNnUWdRTUd4dWdBQ0JuSUJoeTFVcUVBRUNoczBORUNDUUV6QnN1VW9GSWtEQXNMa0JBZ1J5QW9ZdFY2bEFCQWdZTmpkQWdFQk93TERsS2hXSUFBSEQ1Z1lJRU1nSkdMWmNwUUlSSUdEWTNBQUJBamtCdzVhclZDQUNCQXliR3lCQUlDZGcySEtWQ2tTQWdHRnpBd1FJNUFRTVc2NVNnUWdRTUd4dWdBQ0JuSUJoeTFVcUVBRUNoczBORUNDUUV6QnN1VW9GSWtEQXNMa0JBZ1J5QW9ZdFY2bEFCQWdZTmpkQWdFQk93TERsS2hXSUFBSEQ1Z1lJRU1nSkdMWmNwUUlSSUdEWTNBQUJBamtCdzVhclZDQUNCQXliR3lCQUlDZGcySEtWQ2tTQWdHRnpBd1FJNUFRTVc2NVNnUWdRTUd4dWdBQ0JuSUJoeTFVcUVBRUNoczBORUNDUUV6QnN1VW9GSWtEQXNMa0JBZ1J5QW9ZdFY2bEFCQWdZTmpkQWdFQk93TERsS2hXSUFBSEQ1Z1lJRU1nSkdMWmNwUUlSSUhBQlNIMERhK0ozd1VZQUFBQUFTVVZPUks1Q1lJST0iIGlkPSJDYWxxdWUtZGltYWdlIiB3aWR0aD0iMzEwIiBoZWlnaHQ9IjMxMCIgeD0iMCIgeT0iMCIvPjxwYXRoIGlkPSJGb3JtZSIgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9Im5vbmUiIGQ9Im0xODIgMjU3LTIgNTNxMCA1LTQgNXQtNS00bC0xLTI5YzAtMjUgMC0yNS00LTI2bC0xMC0zYTU0IDU0IDAgMCAxLTI5LTI1bC00LTkgMS01IDQtMSA0IDMgNSA5YTU0IDU0IDAgMCAwIDE5IDE2YzQgMiA4IDIgNDggM2w1My0xcTktMSAxNC01bDEyLTkgNS03cTAtMi0xNi0yLTE3IDAtMjUtMmwtMTUtNi0xMy05LTUtNyAyLTUgNC0xIDUgNGE1MSA1MSAwIDAgMCAxOSAxMmM0IDEgMTAgMiAyOCAyIDIzIDAgMjMgMCAyNS01cTItNSAyLTE3YzAtOSAwLTEyLTMtMTlsLTYtMTQtOC0xMS0xMy03LTE3LTRxLTggMC0xMy0zbC04LTUtNy0xMXEtNC04LTgtMTJsLTExLThjLTYtNC02LTQtNDItNHMtMzcgMC00NCAzbC0xNSA4Yy03IDMtMTAgNi0xOSAxN3MtMTEgMTQtMTUgMjRMMjEgMzA5cS0xIDctNSA2LTQgMS00LTJsMTEtNDZjMTItNDQgMTItNDQgOS01MUwwIDE0OHEtMS0zIDgtN2wzNC0xNCAyLTI1IDQtNTlxMC00IDUtM2wxNSA2IDM0IDE1YzcgMyA3IDMgMTAtMWw4LTEyIDI4LTQ0cTMtMSA1IDRsMzAgNDdxNSAxMCA4IDhsMTctNyAzNy0xNSAyIDQgMiAxNSA1IDUzYzEgNiAxIDYgOCA4cTggMSAxNCA0bDEyIDlxNSA0IDkgMTIgNSA2IDggMTZjMyA3IDMgMTEgNCAyMHEwIDExLTIgMjBsLTYgMTktMTEgMTYtMTMgMTEtMTYgNmMtNyAyLTE1IDItNDQgMnpNMzkgMjA1bDItMyAxNi02My00LTItMjAgNi0xOSA5Yy0xIDEgMCAzIDUgMTR6bTI0MC0zMS02LTMtMi03cTAtNSA0LTQgNS0xIDYgMmwzIDYtMSA1em0tODYtMTctNy0yLTUtOGMtMS02LTEtNiAxLTExcTEtNiA2LThjNS0zIDUtMyA5LTFxNCAxIDcgNmwyIDgtMiA4cS0yIDUtNSA2ek02MyAxMjhsNC02YTE0NSAxNDUgMCAwIDEgMjUtMjhsMTItOXE1LTIgNS00bC0xLTQtNy01LTQzLTE2LTIgMTMtMyA0NWMwIDcgMCA3IDUgMTB6bTE3OS0xMiAxLTExLTYtNDktMTEgNC0zMCAxNSA0IDIgMTEgNWE1NCA1NCAwIDAgMSAxOSAyMWw3IDl6TTEyNyA3N3E2LTIgMjktMmMyMCAwIDIzIDAgMjMtMnExLTItMS01bC0yNy00NXEtMi01LTUgMmwtMjggNDcgMSA0cTIgMyA4IDEiLz48L3N2Zz4=)](https://github.com/quentinlamamy)