const fs = require('fs')
const path = require('path')
const dayjs = require('dayjs')
const { copyFolderRecursiveSync } = require('./utils')
const { escapeStringToRegex } = require('./utils')
const { generateDiograph } = require('../generators/diograph-generator')

function convertDiographUrlsRelative({ diograph, baseUrl }) {
  Object.keys(diograph).forEach((dioryId) => {
    const diory = diograph[dioryId]
    if (diory.image) {
      diory.image = diory.image.replace(new RegExp(`${escapeStringToRegex(baseUrl)}[\\/]{1,2}`), '')
    }
    if (diory.data && diory.data[0].contentUrl) {
      diory.data[0].contentUrl = diory.data[0].contentUrl.replace(
        new RegExp(`${escapeStringToRegex(baseUrl)}[\\/]{1,2}`),
        ''
      )
    }
  })
  return diograph
}

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

  // Throw error if folder includes a diograph.json
  // TODO: Support for folders with diograph.json
  const diographJsonPath = path.join(importedFolderPathInDioryFolder, 'diograph.json')
  if (fs.existsSync(diographJsonPath)) {
    throw new Error('NOT IMPLEMENTED: Imported folder had diograph.json file')
  }

  // Generate diograph if no diograph.json
  const diograph = await generateDiograph(importedFolderPathInDioryFolder)

  return {
    ...diograph,
    diograph: convertDiographUrlsRelative({
      diograph: diograph.diograph,
      baseUrl: dioryFolderLocation,
    }),
  }
}
