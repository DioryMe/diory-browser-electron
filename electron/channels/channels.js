const { ipcMain } = require('electron')
const { channels } = require('../../src/shared/constants')
const { eventHandlerWrapper } = require('./channel-util')

const { getHomeEventHandler } = require('./get-home-channel')
const { getRoomEventHandler } = require('./get-room-channel')
const { generateDiographEventHandler } = require('./generate-diograph-channel')
const { saveRoomEventHandler } = require('./save-room-channel')
const { saveHomeEventHandler } = require('./save-home-channel')

/* GET_ROOM */
ipcMain.on(channels.GET_ROOM, eventHandlerWrapper(channels.GET_ROOM, getRoomEventHandler))

/* GET_HOME */
ipcMain.on(channels.GET_HOME, eventHandlerWrapper(channels.GET_HOME, getHomeEventHandler))

/* GENERATE_DIOGRAPH */
ipcMain.on(
  channels.GENERATE_DIOGRAPH,
  eventHandlerWrapper(channels.GENERATE_DIOGRAPH, generateDiographEventHandler)
)

/* SAVE_ROOM */
ipcMain.on(channels.SAVE_ROOM, eventHandlerWrapper(channels.SAVE_ROOM, saveRoomEventHandler))

/* SAVE_HOME */
ipcMain.on(channels.SAVE_HOME, eventHandlerWrapper(channels.SAVE_HOME, saveHomeEventHandler))
