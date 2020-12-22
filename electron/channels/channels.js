const { ipcMain } = require('electron')
const { channels } = require('../../src/shared/constants')
const { handleEvent } = require('./handle-event')

const { handleGetHomeEvent } = require('./get-home-channel')
const { handleGetRoomEvent } = require('./get-room-channel')

/* GET_ROOM */
ipcMain.on(channels.GET_ROOM, handleEvent(handleGetRoomEvent))

/* GET_HOME */
ipcMain.on(channels.GET_HOME, handleGetHomeEvent)
