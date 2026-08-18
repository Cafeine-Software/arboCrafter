/* 
 * Copyright (c) 2025-2026 Quentin Lamamy
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

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
            fs.mkdirSync(outputPath, { recursive: true });
        }

        for (const [distFilename, distContent] of Object.entries(fileTreeStructure)) {

            const distFilePath = path.join(outputPath, distFilename);

            // If the content is a string : create a file
            if (typeof distContent === 'string') {

                // Get content from external source
                if (distContent.startsWith("@")) {

                    const flatten = distContent.startsWith("@!");
                    const sanitizedContent = distContent.slice(flatten ? 2 : 1).trim();
                    const srcFilePath = path.resolve(sanitizedContent);

                    if (fileExists(srcFilePath)) {

                        // Check if it's a file or a folder
                        const stats = fs.statSync(srcFilePath)

                        // Copy whole folder
                        if (stats.isDirectory()) {
                            copyFolder(srcFilePath, distFilePath, !flatten)
                            // Copy the file
                        } else {
                            copyFile(srcFilePath, distFilePath)
                        }

                    } else { throw new Error(`File '${srcFilePath}' not found`) }


                } else { fs.writeFileSync(distFilePath, distContent, 'utf-8'); } // Write the string as file content

            }
            // If the content is an object : create a folder
            else if (typeof distContent === 'object') {

                fs.mkdirSync(distFilePath, { recursive: true });
                buildFileTree(distContent, distFilePath);

            }

        }

    } catch (error) { throw new Error(`Error while building file tree`, { cause: error }) }

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

    } catch (error) { throw new Error(`Error while copying file ${filePath} to ${distFilePath}`, { cause: error }) }

}

/**
 * @description Copy a folder from a path to another
 * @param {String} folderPath 
 * @param {String} distFolderPath 
 * @returns {Void}
 */
function copyFolder(folderPath, distFolderPath, keepStructure = true) {

    try {

        // Check if folder exists
        if (!fileExists(folderPath)) throw new Error(`Folder ${folderPath} not found`)

        // Check if dist folder exists
        if (!fileExists(distFolderPath)) {
            fs.mkdirSync(distFolderPath, { recursive: true });
        }

        if (!keepStructure) {

            // List all file and subfolders files in folderPath
            const files = fs.readdirSync(folderPath, { withFileTypes: true, recursive: true });

            for (const file of files) {

                // Copy file
                if (file.isFile()) {

                    const srcPath = path.join(file.parentPath, file.name)
                    const distPath = path.join(distFolderPath, file.name)

                    copyFile(srcPath, distPath)
                }

            }

        } else {

            // Copy the whole folder with its structure
            fs.cpSync(folderPath, distFolderPath, { recursive: true })

        }


    } catch (error) { throw new Error(`Error while copying folder ${folderPath} to ${distFolderPath}`, { cause: error }) }

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