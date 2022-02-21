const { Room } = require('diograph-js')
const { settingsStore } = require('./utils')

exports.deleteDataobject = async function deleteDataobject(contentUrl) {
  const dioryFolderLocation = settingsStore().get('dioryFolderLocation')
  const room = new Room({ baseUrl: dioryFolderLocation })
  await room.deleteDataobject(contentUrl)
  return contentUrl
}
