const { contextBridge, shell, ipcRenderer } = require('electron')
const frontendLogger = require('electron-log')

const { channels } = require('../src/shared/constants')

const { importFolder } = require('./lib/import-folder')
const { getDiograph } = require('./lib/get-diograph')
const { getDioryFolderLocation } = require('./lib/get-diory-folder-location')
const { setDioryFolderLocation } = require('./lib/set-diory-folder-location')
const { saveDiographJson } = require('./lib/save-diograph-json')

contextBridge.exposeInMainWorld('channelsApi', {
  [channels.IMPORT_FOLDER]: importFolder,
  [channels.GET_DIOGRAPH]: getDiograph,
  [channels.SAVE_DIOGRAPH]: saveDiographJson,
  [channels.GET_DIORY_FOLDER_LOCATION]: getDioryFolderLocation,
  [channels.SET_DIORY_FOLDER_LOCATION]: setDioryFolderLocation,
  showItemInFolder: async (fullPath) => shell.showItemInFolder(fullPath),
  openItemInDesktopManner: (path) => shell.openPath(path),
  openWebsiteInBrowser: (url) => shell.openExternal(url),
  showOpenDialog: () => ipcRenderer.invoke('showOpenDialog'),
  frontendLogger: frontendLogger.functions,
})

contextBridge.exposeInMainWorld('processEnv', {
  TESTCAFE_TEST: process.env.TESTCAFE_TEST,
  PWD: process.env.PWD,
})
