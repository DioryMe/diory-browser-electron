const { contextBridge, shell, ipcRenderer } = require('electron')
const { fileURLToPath } = require('url')
const { join } = require('path')
const { readdirSync } = require('fs')

const { ElectronServer } = require('diograph-js')
const { Generator } = require('../file-generator')

const { channels } = require('../src/shared/constants')

const { importFolder } = require('./lib/import-folder')
const { getDiograph } = require('./lib/get-diograph')
const { getDioryFolderLocation } = require('./lib/get-diory-folder-location')
const { setDioryFolderLocation } = require('./lib/set-diory-folder-location')
const { saveDiograph } = require('./lib/save-diograph')

function channelLogger(handler, params) {
  console.log(`BACK-REQ: ${handler.name} called with`, params)
  const response = handler(params)
  response.then((solvedResponse) => {
    console.log(`BACK-RES: ${handler.name} responded with`, solvedResponse)
  })
  return response
}

// NOTE: Currently channels using channelLogger can receive only one parameter!
// NOTE2: All functions used as channels must return a Promise!
contextBridge.exposeInMainWorld('channelsApi', {
  [channels.IMPORT_FOLDER]: (params) => channelLogger(importFolder, params),
  [channels.GET_DIOGRAPH]: (params) => channelLogger(getDiograph, params),
  [channels.SAVE_DIOGRAPH]: (params) => channelLogger(saveDiograph, params),
  [channels.GET_DIORY_FOLDER_LOCATION]: (params) => channelLogger(getDioryFolderLocation, params),
  [channels.SET_DIORY_FOLDER_LOCATION]: (params) => channelLogger(setDioryFolderLocation, params),
  [channels.OPEN_FOLDER]: async (fileUrl) => shell.showItemInFolder(fileURLToPath(fileUrl)),
  openItemInDesktopManner: (fileUrl) => shell.openPath(fileURLToPath(fileUrl)),
  [channels.OPEN_IN_BROWSER]: (url) => shell.openExternal(url),
  showOpenDialog: () => ipcRenderer.invoke('showOpenDialog'),

  ...new ElectronServer().apiActions(),

  listContentSource: async (path) => {
    const folderPath = '../demo-content-room/Diory Content/Jane/'
    const folderList = readdirSync(folderPath)

    const generator = new Generator()
    const dioryArray = await Promise.all(
      folderList.map(async (fileName) => {
        const filePath = join(folderPath, fileName)
        const diory = await generator.generateDioryFromFile(filePath)
        const dataUrl = `data:image/jpeg;base64,${diory.thumbnailBuffer.toString('base64')}`
        diory.image = dataUrl
        return { [fileName]: diory }
      })
    )
    return dioryArray.reduce((current, cum) => ({ ...current, ...cum }), {})
  },
})

contextBridge.exposeInMainWorld('processEnv', {
  TESTCAFE_TEST: process.env.TESTCAFE_TEST,
  PWD: process.env.PWD,
})
