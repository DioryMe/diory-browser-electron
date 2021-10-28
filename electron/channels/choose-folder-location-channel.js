const fs = require('fs')
const HomeStore = require('electron-store')
const { saveDiographJson } = require('../lib/save-diograph-json')

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
  const myDioryFolderPath = `${folderLocation}/My Diory`

  // TODO: Read already existing My Diory folder (=diograph.json)
  if (fs.existsSync(`${myDioryFolderPath}/diograph.json`)) {
    const errorMessage = `NOT IMPLEMENTED: chooseFolderLocation: diograph.json already exists in My Diory folder`
    throw new Error(errorMessage)
  }

  // TODO: Detect if My Diory folder is empty or non-empty and act accordingly
  if (fs.existsSync(myDioryFolderPath)) {
    const errorMessage = `NOT IMPLEMENTED: chooseFolderLocation: My Diory folder already exists in the given location`
    // const errorMessage = `NOT IMPLEMENTED: chooseFolderLocation: My Diory folder is not empty`
    throw new Error(errorMessage)
  }

  fs.mkdirSync(myDioryFolderPath)

  await saveDiographJson(myDioryFolderPath, defaultDiograph.diograph, defaultDiograph.rootId)

  const store = new HomeStore({
    cwd: process.env.TESTCAFE_TEST ? `${process.env.PWD}/tmp/${Date.now()}` : undefined,
  })
  store.set({ folderLocation: myDioryFolderPath })

  return { ...defaultDiograph, myDioryFolderPath }
}
