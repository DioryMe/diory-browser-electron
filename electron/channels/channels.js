const { ipcMain } = require('electron')
const { channels } = require('../../src/shared/constants')
const { eventHandlerWrapper } = require('./channel-util')

const { getHomeEventHandler } = require('./get-home-channel')
const { getRoomEventHandler } = require('./get-room-channel')
const { generateDiographEventHandler } = require('./generate-diograph-channel')

/* GET_ROOM */
ipcMain.on(channels.GET_ROOM, eventHandlerWrapper(getRoomEventHandler))

/* GET_HOME */
ipcMain.on(channels.GET_HOME, eventHandlerWrapper(getHomeEventHandler))

/* GENERATE_DIOGRAPH */
ipcMain.on(channels.GENERATE_DIOGRAPH, generateDiographEventHandler)
// ipcMain.on(channels.GENERATE_DIOGRAPH, eventHandlerWrapper(generateDiographEventHandler))
