const { ipcMain } = require('electron')
const { channels } = require('../../src/shared/constants')
const { handleGetRoomEvent } = require('../lib/room-util')
const { handleEvent } = require('./handle-event')

/* GET_ROOM */
ipcMain.on(channels.GET_ROOM, handleEvent(handleGetRoomEvent))
