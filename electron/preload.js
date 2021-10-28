const { contextBridge, shell, ipcRenderer } = require('electron')
const frontendLogger = require('electron-log')

const { channels } = require('../src/shared/constants')
const { eventHandlerWrapper } = require('./channels/channel-util')
const { getHomeEventHandler } = require('./channels/get-home-channel')
const { getRoomEventHandler } = require('./channels/get-room-channel')
const { generateDiographEventHandler } = require('./channels/generate-diograph-channel')
const { getDiographEventHandler } = require('./channels/get-diograph-channel')
const { chooseFolderLocationEventHandler } = require('./channels/choose-folder-location-channel')
const { importFolderEventHandler } = require('./channels/import-folder-channel')
const { saveRoomEventHandler } = require('./channels/save-room-channel')
const { saveHomeEventHandler } = require('./channels/save-home-channel')

contextBridge.exposeInMainWorld('channelsApi', {
  [channels.GET_ROOM]: eventHandlerWrapper(channels.GET_ROOM, getRoomEventHandler),
  [channels.GET_HOME]: eventHandlerWrapper(channels.GET_HOME, getHomeEventHandler),
  [channels.GENERATE_DIOGRAPH]: eventHandlerWrapper(
    channels.GENERATE_DIOGRAPH,
    generateDiographEventHandler
  ),
  [channels.CHOOSE_FOLDER_LOCATION]: eventHandlerWrapper(
    channels.CHOOSE_FOLDER_LOCATION,
    chooseFolderLocationEventHandler
  ),
  [channels.GET_DIOGRAPH]: eventHandlerWrapper(channels.GET_DIOGRAPH, getDiographEventHandler),
  [channels.IMPORT_FOLDER]: eventHandlerWrapper(channels.IMPORT_FOLDER, importFolderEventHandler),
  [channels.SAVE_ROOM]: eventHandlerWrapper(channels.SAVE_ROOM, saveRoomEventHandler),
  [channels.SAVE_HOME]: eventHandlerWrapper(channels.SAVE_HOME, saveHomeEventHandler),
  showItemInFolder: (fullPath) => shell.showItemInFolder(fullPath),
  openPath: (path) => shell.openPath(path),
  openExternal: (url) => shell.openExternal(url),
  showOpenDialog: () => ipcRenderer.invoke('showOpenDialog'),
  frontendLogger: frontendLogger.functions,
})

contextBridge.exposeInMainWorld('processEnv', {
  TESTCAFE_TEST: process.env.TESTCAFE_TEST,
  PWD: process.env.PWD,
})
