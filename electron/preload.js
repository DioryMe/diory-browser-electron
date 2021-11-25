const { contextBridge, shell, ipcRenderer } = require('electron')
const frontendLogger = require('electron-log')

const { channels } = require('../src/shared/constants')
const { eventHandlerWrapper } = require('./channels/channel-util')
const { getHomeEventHandler } = require('./channels/get-home-channel')
const { getRoomEventHandler } = require('./channels/get-room-channel')
const { generateDiographEventHandler } = require('./channels/generate-diograph-channel')
// const { saveRoomEventHandler } = require('./channels/save-room-channel')
const { saveHomeEventHandler } = require('./channels/save-home-channel')

const { importFolderEventHandler } = require('./channels/import-folder-channel')
const { getDiograph } = require('./channels/get-diograph-channel')
const { getDioryFolderLocation } = require('./channels/get-diory-folder-location-channel')
const { setDioryFolderLocation } = require('./channels/set-diory-folder-location-channel')
const { saveDiographJson } = require('./lib/save-diograph-json')

contextBridge.exposeInMainWorld('channelsApi', {
  [channels.GET_ROOM]: eventHandlerWrapper(channels.GET_ROOM, getRoomEventHandler),
  [channels.GET_HOME]: eventHandlerWrapper(channels.GET_HOME, getHomeEventHandler),
  [channels.GENERATE_DIOGRAPH]: eventHandlerWrapper(
    channels.GENERATE_DIOGRAPH,
    generateDiographEventHandler
  ),
  [channels.SAVE_ROOM]: eventHandlerWrapper(channels.SAVE_ROOM, saveDiographJson),
  [channels.SAVE_HOME]: eventHandlerWrapper(channels.SAVE_HOME, saveHomeEventHandler),

  [channels.IMPORT_FOLDER]: eventHandlerWrapper(channels.IMPORT_FOLDER, importFolderEventHandler),
  [channels.GET_DIOGRAPH]: eventHandlerWrapper(channels.GET_DIOGRAPH, getDiograph),
  [channels.SAVE_DIOGRAPH]: eventHandlerWrapper(channels.SAVE_DIOGRAPH, saveDiographJson),
  [channels.GET_DIORY_FOLDER_LOCATION]: eventHandlerWrapper(
    channels.GET_DIORY_FOLDER_LOCATION,
    getDioryFolderLocation
  ),
  [channels.SET_DIORY_FOLDER_LOCATION]: eventHandlerWrapper(
    channels.SET_DIORY_FOLDER_LOCATION,
    setDioryFolderLocation
  ),
  showItemInFolder: (fullPath) =>
    new Promise((resolve) => {
      shell.showItemInFolder(fullPath)
      resolve()
    }),
  openExternal: (url) => shell.openExternal(url),
  showOpenDialog: () => ipcRenderer.invoke('showOpenDialog'),
  frontendLogger: frontendLogger.functions,
})

contextBridge.exposeInMainWorld('processEnv', {
  TESTCAFE_TEST: process.env.TESTCAFE_TEST,
  PWD: process.env.PWD,
})
