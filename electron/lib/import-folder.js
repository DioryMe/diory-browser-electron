const fs = require('fs')
const path = require('path')
const dayjs = require('dayjs')
const {
  generateThumbnail: imageThumbnailer,
} = require('diograph-js/dist/generators/image/thumbnailer')
const {
  generateThumbnail: videoThumbnailer,
} = require('diograph-js/dist/generators/video/thumbnailer')
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

  await Promise.all(
    Object.values(diograph.diograph).map(async (diory) => {
      const data = diory.data && diory.data[0]
      if (data) {
        const mime = data.encodingFormat && data.encodingFormat.split('/')[0]
        if (mime === 'image') {
          console.log('image')
          const imageContent = await fs.promises.readFile(data.contentUrl)
          const imageBuffer = await imageThumbnailer(imageContent)
          const dioryThumbnailPath = path.join(importedFolderPathInDioryFolder, `${diory.id}.jpg`)
          diograph.diograph[diory.id] = {
            ...diograph.diograph[diory.id],
            image: dioryThumbnailPath,
          }
          console.log('image return')
          return fs.promises.writeFile(dioryThumbnailPath, imageBuffer)
        }
        if (mime === 'video') {
          console.log('video')
          const { thumbnailBuffer } = await videoThumbnailer(data.contentUrl, 3)
          const dioryThumbnailPath = path.join(importedFolderPathInDioryFolder, `${diory.id}.jpg`)
          diograph.diograph[diory.id] = {
            ...diograph.diograph[diory.id],
            image: dioryThumbnailPath,
          }
          console.log('video return')
          return fs.promises.writeFile(dioryThumbnailPath, thumbnailBuffer)
        }
      }
    })
  )

  return {
    rootId: diograph.rootId,
    diograph: convertDiographUrlsRelative({
      diograph: diograph.diograph,
      baseUrl: dioryFolderLocation,
    }),
  }
}
