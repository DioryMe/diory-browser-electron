const fs = require('fs')
const path = require('path')
const dayjs = require('dayjs')
const { copyFolderRecursiveSync } = require('./utils')
const { generateDiograph } = require('../generators/diograph-generator')
// const { readDiographJson } = require('../lib/read-diograph-json')

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

  // Read existing diograph.json
  // const diographJsonPathpath.join(importedFolderPathInDioryFolder, 'diograph.json')
  // const existingDiograph = readDiographJson({ diographJsonPath })
  // if (existingDiograph) {
  //   throw new Error('NOT IMPLEMENTED: Imported folder had diograph.json file')
  // }

  // Generate diograph if no diograph.json
  const diograph = await generateDiograph(importedFolderPathInDioryFolder)

  // Relative paths for image & contentUrl
  // TODO: Move to own function, how to make immutable?
  Object.keys(diograph.diograph).forEach((dioryId) => {
    const diory = diograph.diograph[dioryId]
    if (diory.image) {
      diory.image = diory.image.replace(`${dioryFolderLocation}/`, '')
    }
    if (diory.data && diory.data[0].contentUrl) {
      diory.data[0].contentUrl = diory.data[0].contentUrl.replace(`${dioryFolderLocation}/`, '')
    }
  })

  return diograph
}
