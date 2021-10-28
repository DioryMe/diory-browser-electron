const HomeStore = require('electron-store')
const fs = require('fs')

const { readDiographJson } = require('../lib/read-diograph-json')

exports.getDiographEventHandler = async function getDiographEventHandler(params) {
  const store = new HomeStore({
    cwd: process.env.TESTCAFE_TEST ? `${process.env.PWD}/tmp/${Date.now()}` : undefined,
  })
  const myDioryFolderPath = store.get('folderLocation')

  // Check that the path still exists
  if (!fs.existsSync(myDioryFolderPath)) {
    return null
  }

  return { folderLocation: null, ...readDiographJson(myDioryFolderPath) }
}
