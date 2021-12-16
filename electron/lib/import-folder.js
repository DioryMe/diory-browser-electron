const fs = require('fs')
const path = require('path')
const dayjs = require('dayjs')
const { copyFolderRecursiveSync } = require('./utils')
const { convertDiographUrlsRelative } = require('./convertDiographUrlsRelative')

const { generateDiograph } = require('../generators/diograph-generator')
const { readDiographJson } = require('./read-diograph-json')

exports.importFolder = async function importFolder({ importFolderPath, dioryFolderLocation }) {
  if (!fs.existsSync(importFolderPath)) {
    const errorMessage = `importFolder: Provided importFolderPath (${importFolderPath}) doesn't exist`
    throw new Error(errorMessage)
  }
  if (!fs.existsSync(dioryFolderLocation)) {
    const errorMessage = `importFolder: Provided dioryFolderLocation (${dioryFolderLocation}) doesn't exist`
    throw new Error(errorMessage)
  }

  // Create new folder to My Diory folder
  let importedFolderPathInDioryFolder = path.join(
    dioryFolderLocation,
    path.basename(importFolderPath)
  )
  // Add suffix to folder name if it already exists
  if (fs.existsSync(importedFolderPathInDioryFolder)) {
    const datePrefix = dayjs().format('YYYY-MM-DDTHHmmss')
    importedFolderPathInDioryFolder = `${importedFolderPathInDioryFolder}-${datePrefix}`
  }
  fs.mkdirSync(importedFolderPathInDioryFolder)
  // Copy everything recursively from importFolderPath to the new destination
  copyFolderRecursiveSync(importFolderPath, importedFolderPathInDioryFolder)

  // Read diograph.json if contains one
  const diographJsonPath = path.join(importedFolderPathInDioryFolder, 'diograph.json')
  if (fs.existsSync(diographJsonPath)) {
    return readDiographJson({ diographJsonPath })
  }

  // Generate diograph if no diograph.json
  const diograph = await generateDiograph(importedFolderPathInDioryFolder)

  return {
    rootId: diograph.rootId,
    diograph: convertDiographUrlsRelative({
      diograph: diograph.diograph,
      baseUrl: dioryFolderLocation,
    }),
  }
}
