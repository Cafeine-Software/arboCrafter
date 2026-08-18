<div align="center">

![ArboCrafter](media/wideLogo_dark.webp)

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

# Changelog

- 18/08/2026 : v1.1.0 — Fixed folder copy, added @! flatten syntax, switched to MPL 2.0

# License

[![Licence](https://img.shields.io/badge/MPL%202.0-00d230?style=for-the-badge&logo=mozilla&logoColor=white)](https://www.mozilla.org/en-US/MPL/2.0/)

# Author

[<img src="https://raw.githubusercontent.com/quentinlamamy/quentinlamamy/b88fe446526c98aac889c6b21611a59c41bcbc3d/media/quentinDino_opti.svg" height=80/>](https://github.com/quentinlamamy)