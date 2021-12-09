const fs = require('fs')
const path = require('path').posix
const { settingsStore, directoryExists } = require('./utils')
const { saveDiograph } = require('./save-diograph')

async function initiateDioryFolder(dioryFolderLocation) {
  fs.mkdirSync(dioryFolderLocation)

  const defaultDiograph = {
    diograph: {
      'my-diory': {
        id: 'my-diory',
        text: 'My Diory',
      },
    },
    rootId: 'my-diory',
  }
  return saveDiograph({
    dioryFolderLocation,
    diograph: defaultDiograph.diograph,
    rootId: defaultDiograph.rootId,
  })
}

async function validateOrInitiateDioryFolder(selectedFolderLocation) {
  if (!directoryExists(selectedFolderLocation)) {
    const errorMessage = `Provided diory folder location doesn't exist (${selectedFolderLocation}). Did you use FileDialog to select it?`
    throw new Error(errorMessage)
  }

  const dioryFolderLocation = path.join(selectedFolderLocation, 'My Diory')
  if (directoryExists(dioryFolderLocation)) {
    const diographJsonPath = path.join(dioryFolderLocation, 'diograph.json')
    if (!fs.existsSync(diographJsonPath)) {
      const errorMessage =
        "My Diory folder already exists in the given location but doesn't have diograph.json"
      throw new Error(errorMessage)
    }
    return dioryFolderLocation
  }

  await initiateDioryFolder(dioryFolderLocation)

  return dioryFolderLocation
}

exports.setDioryFolderLocation = async function setDioryFolderLocation(selectedFolderLocation) {
  const dioryFolderLocation = await validateOrInitiateDioryFolder(selectedFolderLocation)
  settingsStore().set('dioryFolderLocation', dioryFolderLocation)

  return { dioryFolderLocation }
}
