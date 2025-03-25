<div align="center">

![ArboCrafter Badge](media/logo_white.png)

![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
[![Npm](https://img.shields.io/badge/npm-red?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/@cafeine-software/abuseipdb)

[Introduction](#Introduction) • [Features](#Features) [Installation](#Installation) • [Usage](#Usage) • [License](#License) • [Contact](#Contact) • [Links](#Links) • [Support](#support)

<br/>
</div>

# Presentation
Simple and efficient way to create a complete filetree in one function. I created it to simplify the build process of my own framework (i know this information about my life is not usefull xD)

# Features : 
- Create the folders structure
- Create files
- Copy file
- Copy all files from a folder and subfolder

# Installation
```bash
npm i @cafeine-software/arboCrafter
```

# Usage

```javascript
import { buildFileTree } from '@cafeine-software/arboCrafter';

// ⬇ Define the structure of the filetree you want to create
const fileTreeStructure = {}

// ⬇ Where to create the filetree
const outputFolder = "out"

// ⬇ Will do nothing , look at example bellow :)
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

## Folder Files Copy

Will copy all files from source folder but not the structure

```javascript
const fileTreeStructure = {
    folder1:{
        'example.txt':'example content',
        '.gitignore.copy': `@.gitignore`,
    },
    folderCopy:"@../../srcFolderPath"
}

buildFileTree(fileTreeStructure,outputFolder)

// Result :
// - Create a folder 'folder1'
// - Create a file 'example.txt' with content 'example content'
// - Copy file '.gitignore' as '.gitignore.copy'
// - Copy all files from folder '../../srcFolderPath' in 'folderCopy'
```

# License
[<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/CC_BY-NC-SA.svg/512px-CC_BY-NC-SA.svg.png" width="35%"/>](https://creativecommons.org/licenses/by-nc-sa/4.0)


# Contact
Developed by **Quentin Lamamy**, contact me on Linked In

# Links
[![LinkedIn](https://custom-icon-badges.demolab.com/badge/LinkedIn-0A66C2?logo=linkedin-white&logoColor=fff)](https://www.linkedin.com/in/quentin-lamamy/)
[![GitHub](https://img.shields.io/badge/Github-Personal-%23121011.svg?logo=github&logoColor=white)](github.com/quentin-lamamy)
[![GitHub](https://img.shields.io/badge/Github-Cafeine%20Software-%23121011.svg?logo=github&logoColor=white)](github.com/Cafeine-Software)

# Support
<a href="https://www.buymeacoffee.com/quentinlamamy"><img src="https://img.buymeacoffee.com/button-api/?text=Support my work&emoji=&slug=quentinlamamy&button_colour=EAC864&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" style="width:40%"/></a>