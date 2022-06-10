const { contextBridge, shell, ipcRenderer } = require('electron')
const { fileURLToPath } = require('url')
const { join } = require('path')
const { readdirSync } = require('fs')

const { ElectronServer } = require('diograph-js')
const { Generator, getDefaultImage } = require('../file-generator')

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

function folderDefaultImage() {
  return 'data:image/jpeg;base64,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'
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

  listContentSource: async (dioryId, contentSourceAddress) => {
    const folderPath = join(contentSourceAddress, dioryId)
    const folderList = readdirSync(folderPath, { withFileTypes: true })

    const generator = new Generator()
    const dioryArray = await Promise.all(
      folderList.map(async (dirent) => {
        const fileName = dirent.name
        const filePath = join(folderPath, fileName)
        if (dirent.isFile()) {
          const diory = await generator.generateDioryFromFile(filePath)
          const dataUrl = diory.thumbnailBuffer
            ? `data:image/jpeg;base64,${diory.thumbnailBuffer.toString('base64')}`
            : getDefaultImage()
          diory.image = dataUrl
          diory.contentUrl = filePath
          diory.id = join(dioryId, fileName)
          return { [diory.id]: diory.toDioryObject() }
        }
        if (dirent.isDirectory()) {
          const folderDioryId = join(dioryId, fileName)
          // TODO: Move this to diograph-js
          // => generator.generateDioryFromFolder(filePath)
          const contentId = Date.now() * Math.random()
          return {
            [folderDioryId]: {
              id: folderDioryId,
              image: folderDefaultImage(),
              text: fileName,
              // QUESTION: Folder doesn't have contentId
              // but is required to be included to connection.contentUrls
              data: [{ contentUrl: contentId, contentId }],
            },
          }
        }
      })
    )

    return dioryArray.reduce((cum, current) => ({ ...current, ...cum }), {})
  },
})

contextBridge.exposeInMainWorld('processEnv', {
  TESTCAFE_TEST: process.env.TESTCAFE_TEST,
  PWD: process.env.PWD,
})
