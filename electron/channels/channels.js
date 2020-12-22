const { ipcMain } = require('electron')
const { channels } = require('../../src/shared/constants')
const { handleEvent } = require('./handle-event')

const { getHomeEventHandler } = require('./get-home-channel')
const { getRoomEventHandler } = require('./get-room-channel')

/* GET_ROOM */
ipcMain.on(channels.GET_ROOM, handleEvent(getRoomEventHandler))

/* GET_HOME */
ipcMain.on(channels.GET_HOME, getHomeEventHandler)
