const HomeStore = require('electron-store')
const fs = require('fs')

const { readDiographJson } = require('../lib/read-diograph-json')

exports.getDiographEventHandler = async function getDiographEventHandler(params) {
  const store = new HomeStore({
    cwd: process.env.TESTCAFE_TEST ? `${process.env.PWD}/tmp/${Date.now()}` : undefined,
  })
  const { diographFolderPath } = store.get('home')

  // Check that the path still exists
  if (!fs.existsSync(diographFolderPath)) {
    return null
  }

  return readDiographJson(diographFolderPath)
}
