const { rm } = require('fs/promises')
const { join } = require('path')
const { settingsStore } = require('./utils')

exports.deleteThumbnail = async function deleteThumbnail(dioryId) {
  const dioryFolderLocation = settingsStore().get('dioryFolderLocation')
  const thumbnailPath = join(dioryFolderLocation, 'images', `${dioryId}.jpg`)
  try {
    await rm(thumbnailPath)
    return true
  } catch (e) {
    console.log(e)
    console.log("Thumbnail couldn't be removed", thumbnailPath)
    return false
  }
}
