const { DiographJson } = require('diograph-js')
const { settingsStore } = require('./utils')

exports.deleteThumbnail = async function deleteThumbnail(dioryId) {
  const dioryFolderLocation = settingsStore().get('dioryFolderLocation')
  const diographJson = new DiographJson({ baseUrl: dioryFolderLocation })
  try {
    await diographJson.connector.deleteThumbnail(`${dioryId}.jpg`)
    return true
  } catch (e) {
    console.log(e)
    console.log("Thumbnail couldn't be removed")
    return false
  }
}
