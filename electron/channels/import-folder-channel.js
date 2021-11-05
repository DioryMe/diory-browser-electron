const fs = require('fs')
const path = require('path')
const dayjs = require('dayjs')
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

exports.importFolderEventHandler = async function importFolderEventHandler({
  importFolderPath,
  folderLocation,
}) {
  // Create new folder to My Diory folder
  let importedFolderPathInDioryFolder = path.join(folderLocation, path.basename(importFolderPath))
  // Add suffix to folder name if it already exists
  if (fs.existsSync(importedFolderPathInDioryFolder)) {
    const datePrefix = dayjs().format('YYYY-MM-DDTHHmmss')
    importedFolderPathInDioryFolder = `${importedFolderPathInDioryFolder}-${datePrefix}`
  }
  fs.mkdirSync(importedFolderPathInDioryFolder)
  // Copy everything recursively from importFolderPath to the new destination
  copyFolderRecursiveSync(importFolderPath, importedFolderPathInDioryFolder, { recursive: true })

  // Read existing diograph.json
  const existingDiograph = readDiographJson(importedFolderPathInDioryFolder)
  if (existingDiograph) {
    throw new Error('NOT IMPLEMENTED: Imported folder had diograph.json file')
  }

  // Generate diograph if no diograph.json
  const diograph = await generateDiograph(importedFolderPathInDioryFolder)

  // Relative paths for image & contentUrl
  // TODO: Move to own function, how to make immutable?
  Object.keys(diograph.diograph).forEach((dioryId) => {
    const diory = diograph.diograph[dioryId]
    if (diory.image) {
      diory.image = diory.image.replace(`${folderLocation}/`, '')
    }
    if (diory.data && diory.data[0].contentUrl) {
      diory.data[0].contentUrl = diory.data[0].contentUrl.replace(`${folderLocation}/`, '')
    }
  })

  return diograph
}
