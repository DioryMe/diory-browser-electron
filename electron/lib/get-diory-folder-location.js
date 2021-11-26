const HomeStore = require('electron-store')
const path = require('path').posix
const fs = require('fs')

exports.getDioryFolderLocation = async function getDioryFolderLocation() {
  const store = new HomeStore({
    // E2E tests needs to create config.json file to different path every time
    // - otherwise use default
    cwd: process.env.TESTCAFE_TEST ? `${process.env.PWD}/tmp/${Date.now()}` : undefined,
  })

  const dioryFolderLocation = store.get('dioryFolderLocation')
  if (!fs.existsSync(dioryFolderLocation)) {
    store.delete('dioryFolderLocation')
    return false
  }

  const diographJsonPath = path.join(dioryFolderLocation, 'diograph.json')
  if (!fs.existsSync(diographJsonPath)) {
    store.delete('dioryFolderLocation')
    return false
  }

  return { dioryFolderLocation }
}
