const { ipcMain } = require('electron')
const { channels } = require('../../src/shared/constants')
const { getRoom } = require('../lib/room-util')
const UserDataStore = require('electron-store')

ipcMain.on(channels.GET_ROOM, (event) => {
  console.log('GET_ROOM', path)
  const store = new UserDataStore()

  const defaultRoom = {
    roomId: 'welcome-room',
    path: './public/default-welcome-room',
    dioryIdInFocus: 'welcome-room',
  }

  const roomInFocus = store.get('roomInFocus') || defaultRoom

  getRoom(roomInFocus.path).then((diograph) => {
    console.log(roomInFocus)
    console.log(diograph)
    console.log('--------')
    roomInFocus.diograph = diograph.diograph
    event.sender.send(channels.GET_ROOM, roomInFocus)
  })
})
