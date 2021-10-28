const fs = require('fs')
const path = require('path')
const { generateDiograph } = require('../generators/diograph-generator')
const { readDiographJson } = require('../lib/read-diograph-json')

function copyFolderRecursiveSync(source, target) {
  if (!fs.lstatSync(source).isDirectory()) {
    throw new Error(`copyFolderRecursiveSync: source folder (${source}) is not a folder!`)
  }

  fs.readdirSync(source).forEach((itemName) => {
    const sourcePath = path.join(source, itemName)
    const targetPath = path.join(target, itemName)

    if (fs.lstatSync(sourcePath).isDirectory()) {
      fs.mkdirSync(targetPath)
      copyFolderRecursiveSync(sourcePath, targetPath)
    } else {
      fs.copyFileSync(sourcePath, targetPath)
    }
  })
}

exports.importFolderEventHandler = async function importFolderEventHandler(importFolderPath) {
  // TODO: Replace path with { importFolderPath, folderLocation }
  const folderLocation = '/Volumes/Lacie SSD/My Friends copy'

  // Create new folder to My Diory folder
  let importedFolderPathInDioryFolder = path.join(folderLocation, path.basename(importFolderPath))
  // Add suffix to folder name if it already exists
  if (fs.lstatSync(importedFolderPathInDioryFolder).isDirectory()) {
    importedFolderPathInDioryFolder = `${importedFolderPathInDioryFolder}-${Date.now()}`
  }
  fs.mkdirSync(importedFolderPathInDioryFolder)
  // Copy everything recursively from importFolderPath to the new destination
  copyFolderRecursiveSync(importFolderPath, importedFolderPathInDioryFolder, { recursive: true })

  // Read existing diograph.json
  const existingDiograph = readDiographJson(importedFolderPathInDioryFolder)
  if (existingDiograph) {
    return existingDiograph
  }

  // Generate diograph if no diograph.json
  const diograph = await generateDiograph(importedFolderPathInDioryFolder)
  // await saveDiographJson(path, diograph.diograph, diograph.rootId)
  return diograph
}
