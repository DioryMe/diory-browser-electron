const path = require('path').posix
const fs = require('fs')
const { settingsStore } = require('./utils')

exports.getDioryFolderLocation = async function getDioryFolderLocation() {
  const dioryFolderLocation = settingsStore().get('dioryFolderLocation')

  if (!fs.existsSync(dioryFolderLocation)) {
    settingsStore().delete('dioryFolderLocation')
    return false
  }

  const diographJsonPath = path.join(dioryFolderLocation, 'diograph.json')
  if (!fs.existsSync(diographJsonPath)) {
    settingsStore().delete('dioryFolderLocation')
    return false
  }

  return { dioryFolderLocation }
}
