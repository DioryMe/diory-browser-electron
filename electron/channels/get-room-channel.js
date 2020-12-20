const { ipcMain } = require('electron')
const { channels } = require('../../src/shared/constants')
const { handleGetRoomEvent } = require('../lib/room-util')

ipcMain.on(channels.GET_ROOM, handleGetRoomEvent)
