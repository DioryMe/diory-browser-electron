const { contextBridge, shell, ipcRenderer } = require('electron')
const { fileURLToPath } = require('url')

const { readFileSync, existsSync, mkdirSync, writeFileSync } = require('fs')
const { dirname, join } = require('path')

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

  getPath: () =>
    '/Users/Jouni/Code/electron-diograph-js/demo-content-room' || join(__dirname, 'test-folder'),
  // Client read & write
  writeItem: (url, fileContent) => {
    if (fileContent instanceof ArrayBuffer) {
      fileContent = Buffer.from(fileContent)
    }
    const dirPath = dirname(url)
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true })
    }
    return writeFileSync(url, fileContent)
  },
  readTextFile: (filePath) => readFileSync(filePath, { encoding: 'utf-8' }),
  readItem: (url) => readFileSync(url),
  listContentSource: (path) => {
    console.log(path)
    return {
      '6abcc50e-422e-4802-9b14-84fcdd08f591': {
        id: '6abcc50e-422e-4802-9b14-84fcdd08f591',
        image: '../demo-content-room/Diory Content/Jane/PIXNIO-12656-2816x2112.jpeg',
        created: '2021-02-25T12:27:27.226Z',
        modified: '2021-02-25T12:27:27.436Z',
        data: [
          {
            '@context': 'https://schema.org',
            '@type': 'ImageObject',
            contentUrl: 'PIXNIO-12656-2816x2112.jpeg',
            height: 2112,
            width: 2816,
            encodingFormat: 'image/jpeg',
          },
        ],
      },
      'e488d7e0-773f-4218-b893-2d0d164cce18': {
        id: 'e488d7e0-773f-4218-b893-2d0d164cce18',
        image: '../demo-content-room/Diory Content/Jane/PIXNIO-12662-2816x2112.jpeg',
        created: '2021-02-25T12:27:27.441Z',
        modified: '2021-02-25T12:27:27.467Z',
        data: [
          {
            '@context': 'https://schema.org',
            '@type': 'ImageObject',
            contentUrl: 'PIXNIO-12662-2816x2112.jpeg',
            height: 2112,
            width: 2816,
            encodingFormat: 'image/jpeg',
          },
        ],
      },
      'dd1a14b9-f564-4c2c-8330-df29cd78ac45': {
        id: 'dd1a14b9-f564-4c2c-8330-df29cd78ac45',
        image: '../demo-content-room/Diory Content/Jane/PIXNIO-12700-2816x2112.jpeg',
        created: '2021-02-25T12:27:27.474Z',
        modified: '2021-02-25T12:27:27.483Z',
        data: [
          {
            '@context': 'https://schema.org',
            '@type': 'ImageObject',
            contentUrl: 'PIXNIO-12700-2816x2112.jpeg',
            height: 2112,
            width: 2816,
            encodingFormat: 'image/jpeg',
          },
        ],
      },
    }
  },
})

contextBridge.exposeInMainWorld('processEnv', {
  TESTCAFE_TEST: process.env.TESTCAFE_TEST,
  PWD: process.env.PWD,
})
