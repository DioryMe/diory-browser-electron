const { contextBridge, shell } = require('electron')
const { dialog } = require('electron').remote
const frontendLogger = require('electron-log')

const { channels } = require('../src/shared/constants')
const { eventHandlerWrapper } = require('./channels/channel-util')
const { getHomeEventHandler } = require('./channels/get-home-channel')
const { getRoomEventHandler } = require('./channels/get-room-channel')
const { generateDiographEventHandler } = require('./channels/generate-diograph-channel')
const { saveRoomEventHandler } = require('./channels/save-room-channel')
const { saveHomeEventHandler } = require('./channels/save-home-channel')

contextBridge.exposeInMainWorld('channelsApi', {
  [channels.GET_ROOM]: eventHandlerWrapper(channels.GET_ROOM, getRoomEventHandler),
  [channels.GET_HOME]: eventHandlerWrapper(channels.GET_HOME, getHomeEventHandler),
  [channels.GENERATE_DIOGRAPH]: eventHandlerWrapper(
    channels.GENERATE_DIOGRAPH,
    generateDiographEventHandler
  ),
  [channels.SAVE_ROOM]: eventHandlerWrapper(channels.SAVE_ROOM, saveRoomEventHandler),
  [channels.SAVE_HOME]: eventHandlerWrapper(channels.SAVE_HOME, saveHomeEventHandler),
  openInFinder: (path) => shell.showItemInFolder(path),
  openInExternalApplication: (path) => shell.openPath(path),
  showOpenDialog: () => dialog.showOpenDialog({ properties: ['openDirectory'] }),
  frontendLogger: frontendLogger.functions,
})

contextBridge.exposeInMainWorld('processEnv', {
  TESTCAFE_TEST: process.env.TESTCAFE_TEST,
  PWD: process.env.PWD,
})
