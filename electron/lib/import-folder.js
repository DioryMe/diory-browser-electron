const os = require('os')
const asyncBatch = require('async-batch').default
const fs = require('fs')
const path = require('path')
const dayjs = require('dayjs')
const { DiographJson, imageThumbnailer, dioryVideoGenerator } = require('diograph-js')
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

  // Check that images folder exists before creating thumbnails
  const imagesFolderPath = path.join(dioryFolderLocation, 'images')
  if (!fs.existsSync(imagesFolderPath)) {
    fs.mkdirSync(imagesFolderPath)
  }

  const dioryCount = Object.values(diograph.diograph).length
  const cpuCount = os.cpus().length
  console.log('cpuCount', cpuCount)
  let processedDiories = 0

  try {
    await asyncBatch(
      Object.values(diograph.diograph), // List of parameters (=diories)
      async (diory) => {
        // Handler function which gets diory as a parameters
        const data = diory.data && diory.data[0]
        console.log('START', data && data.contentUrl)
        if (data) {
          const mime = data.encodingFormat && data.encodingFormat.split('/')[0]
          if (mime === 'image') {
            const imageContent = await fs.promises.readFile(data.contentUrl)
            const thumbnailBuffer = await imageThumbnailer(imageContent)
            const diographJson = new DiographJson({ baseUrl: dioryFolderLocation })
            let image
            if (thumbnailBuffer) {
              image = await diographJson.connector.addThumbnail(thumbnailBuffer, `${diory.id}.jpg`)
            }
            diograph.diograph[diory.id] = {
              ...diograph.diograph[diory.id],
              image,
            }
          }
          if (mime === 'video') {
            const { thumbnailBuffer, typeSpecificDiory } = await dioryVideoGenerator(
              data.contentUrl,
              data.contentUrl
            )
            let image
            if (thumbnailBuffer) {
              const diographJson = new DiographJson({ baseUrl: dioryFolderLocation })
              image = await diographJson.connector.addThumbnail(thumbnailBuffer, `${diory.id}.jpg`)
            }
            diograph.diograph[diory.id] = {
              ...diograph.diograph[diory.id],
              ...(typeSpecificDiory.date && { date: typeSpecificDiory.date }),
              ...(typeSpecificDiory.latlng && { latlng: typeSpecificDiory.latlng }),
              ...(typeSpecificDiory.data && { data: typeSpecificDiory.data }),
              image,
            }
            diograph.diograph[diory.id].data[0].encodingFormat = data.encodingFormat
          }
        }
        processedDiories += 1
        if (processedDiories % 10 === 0) {
          console.log('Progress:', `${processedDiories}/${dioryCount}`)
        }
        console.log('DONE', data && data.contentUrl)
      },
      cpuCount // Number of concurrent workers (=number of cpu cores)
    )
  } catch (e) {
    console.log(e)
  }

  return {
    rootId: diograph.rootId,
    diograph: convertDiographUrlsRelative({
      diograph: diograph.diograph,
      baseUrl: dioryFolderLocation,
    }),
  }
}
