const { contextBridge } = require('electron')

const frontendLogger = require('electron-log')
const { dialog } = require('electron')
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
  showOpenDialog: dialog.showOpenDialog,
  frontendLogger: () => frontendLogger.functions,
})

window.processEnv = {}
window.processEnv.TESTCAFE_TEST = process.env.TESTCAFE_TEST
window.processEnv.PWD = process.env.PWD
