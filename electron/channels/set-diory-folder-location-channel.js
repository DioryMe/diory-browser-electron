const fs = require('fs')
const path = require('path').posix
const HomeStore = require('electron-store')
const { saveDiographJson } = require('../lib/save-diograph-json')

function directoryExists(folderPath) {
  return fs.existsSync(folderPath) && fs.lstatSync(folderPath).isDirectory()
}

async function initiateDioryFolder(myDioryFolderPath) {
  fs.mkdirSync(myDioryFolderPath)

  const defaultDiograph = {
    diograph: {
      'my-diory': {
        id: 'my-diory',
        text: 'My Diory',
      },
    },
    rootId: 'my-diory',
  }
  return saveDiographJson({
    path: myDioryFolderPath,
    diograph: defaultDiograph,
    rootId: 'my-diory',
  })
}

async function validateOrInitiateDioryFolder(dioryFolderLocation) {
  if (!directoryExists(dioryFolderLocation)) {
    const errorMessage = `Provided diory folder location doesn't exist (${dioryFolderLocation}). Did you use FileDialog to select it?`
    throw new Error(errorMessage)
  }

  const myDioryFolderPath = path.join(dioryFolderLocation, 'My Diory')
  const diographJsonPath = path.join(myDioryFolderPath, 'diograph.json')
  if (directoryExists(myDioryFolderPath)) {
    if (!fs.existsSync(diographJsonPath)) {
      const errorMessage =
        "My Diory folder already exists in the given location but doesn't have diograph.json"
      throw new Error(errorMessage)
    }
    return myDioryFolderPath
  }

  await initiateDioryFolder(myDioryFolderPath)

  return myDioryFolderPath
}

exports.setDioryFolderLocation = async function setDioryFolderLocation(folderLocation) {
  const dioryFolderLocation = await validateOrInitiateDioryFolder(folderLocation)

  const store = new HomeStore({
    // E2E tests needs to create config.json file to different path every time
    // - otherwise use default
    cwd: process.env.TESTCAFE_TEST ? `${process.env.PWD}/tmp/${Date.now()}` : undefined,
  })
  store.set('dioryFolderLocation', dioryFolderLocation)

  return { dioryFolderLocation }
}
