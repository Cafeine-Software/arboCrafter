import fs from 'fs';
import path from 'path';

/**
 * @description Build a filetree from a filetree structure definition
 * @param {Object} fileTreeStructure Describes the filetree to build
 * @param {String} outputPath The path to the output filetree
 * @return {Void}
 */
export function buildFileTree(fileTreeStructure, outputPath) {

    try {

        // If the output folder does not exist, create it
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath);
        }

        for (const [distFilename, distContent] of Object.entries(fileTreeStructure)) {

            const distFilePath = path.join(outputPath, distFilename);

            // If the content is a string : create a file
            if (typeof distContent === 'string') {

                // Get content from external source
                if (distContent.startsWith("@")) {
    
                    const srcFilePath = path.join(process.cwd(),distContent.replaceAll("@", "").trim())

                    if(fileExists(srcFilePath)){

                        // Check if it's a file or a folder
                        const stats = fs.statSync(srcFilePath)
        
                        // Copy whole folder
                        if (stats.isDirectory()) {
                            copyFolder(srcFilePath, distFilePath)
                        // Copy the file
                        } else {
                            copyFile(srcFilePath, distFilePath)
                        }

                    }else{throw new Error(`File '${srcFilePath}' not found`)}

                    // Write the string as file content
                } else {

                    fs.writeFileSync(distFilePath, distContent, 'utf-8');

                }

            }
            // If the content is an object : create a folder
            else if (typeof distContent === 'object') {

                fs.mkdirSync(distFilePath, { recursive: true });
                buildFileTree(distContent, distFilePath);

            }

        }

    } catch (error) {throw new Error(`Error while building file tree`, { cause: error })}

}

/**
 * @description Copy a file from a path to another
 * @param {String} filePath 
 * @param {String} distFilePath 
 * @returns {Void}
 */
function copyFile(filePath, distFilePath) {

    try {

        fs.copyFileSync(filePath, distFilePath)

    } catch (error) {throw new Error(`Error while copying file ${filePath} to ${distFilePath}`, { cause: error })}

}

/**
 * @description Copy a folder from a path to another
 * @param {String} folderPath 
 * @param {String} distFolderPath 
 * @returns {Void}
 */
function copyFolder(folderPath, distFolderPath) {

    try {

        // Check if folder exists
        if (!fileExists(folderPath)) throw new Error(`Folder ${folderPath} not found`)

        // Check if dist folder exists
        if (!fileExists(distFolderPath)) {
            fs.mkdirSync(distFolderPath, { recursive: true });
        }

        // List all file and subfolders files in folderPath
        const files = fs.readdirSync(folderPath, { withFileTypes: true, recursive: true });

        for (const file of files) {
            
            // Copy file
            if (file.isFile()) {

                const srcPath = path.join(file.parentPath,file.name)
                const distPath = path.join(distFolderPath, file.name)

                copyFile(srcPath, distPath)
            }

        }

    } catch (error) {throw new Error(`Error while copying folder ${folderPath} to ${distFolderPath}`, { cause: error })}

}

/**
 * @description Check if a file exists
 * @param {String} filePath 
 * @returns {Boolean}
 */
function fileExists(filePath) {

    try {
        fs.accessSync(filePath, fs.constants.F_OK);
        return true;
    } catch {
        return false;
    }

}