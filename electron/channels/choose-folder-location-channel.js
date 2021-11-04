const fs = require('fs')
const HomeStore = require('electron-store')
const { saveDiographJson } = require('../lib/save-diograph-json')
const { readDiographJson } = require('../lib/read-diograph-json')

const defaultDiograph = {
  diograph: {
    'my-diory': {
      id: 'my-diory',
      text: 'My Diory',
    },
  },
  rootId: 'my-diory',
}

exports.chooseFolderLocationEventHandler = async function chooseFolderLocationEventHandler(
  folderLocation
) {
  const store = new HomeStore({
    cwd: process.env.TESTCAFE_TEST ? `${process.env.PWD}/tmp/${Date.now()}` : undefined,
  })
  const myDioryFolderPath = `${folderLocation}/My Diory`

  if (fs.existsSync(myDioryFolderPath)) {
    // Read existing diograph.json
    if (fs.existsSync(`${myDioryFolderPath}/diograph.json`)) {
      const existingDiographJson = await readDiographJson(myDioryFolderPath)
      store.set({ folderLocation: myDioryFolderPath })
      return existingDiographJson
    }

    // TODO: Detect if My Diory folder is empty or non-empty and act accordingly
    const errorMessage = `NOT IMPLEMENTED: chooseFolderLocation: My Diory folder already exists in the given location`
    // const errorMessage = `NOT IMPLEMENTED: chooseFolderLocation: My Diory folder is not empty`
    throw new Error(errorMessage)
  }

  fs.mkdirSync(myDioryFolderPath)

  await saveDiographJson(myDioryFolderPath, defaultDiograph.diograph, defaultDiograph.rootId)

  store.set({ folderLocation: myDioryFolderPath })

  return { ...defaultDiograph, folderLocation: myDioryFolderPath }
}
