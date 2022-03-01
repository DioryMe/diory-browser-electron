// const path = require('path').posix
// const fs = require('fs')
const { settingsStore } = require('./utils')

exports.getDioryFolderLocation = async function getDioryFolderLocation() {
  const dioryFolderLocation = settingsStore().get('dioryFolderLocation')

  // if (!fs.existsSync(dioryFolderLocation)) {
  //   settingsStore().delete('dioryFolderLocation')
  //   console.log(
  //     `getDioryFolderLocation: Removed invalid dioryFolderLocation ${dioryFolderLocation} from config.json`
  //   )
  //   return false
  // }

  // const diographJsonPath = path.join(dioryFolderLocation, 'diograph.json')
  // if (!fs.existsSync(diographJsonPath)) {
  //   settingsStore().delete('dioryFolderLocation')
  //   console.log(
  //     `getDioryFolderLocation: Removed invalid dioryFolderLocation ${diographJsonPath} from config.json`
  //   )
  //   return false
  // }

  return { dioryFolderLocation }
}
