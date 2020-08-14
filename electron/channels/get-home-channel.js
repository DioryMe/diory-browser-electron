const path = require('path')
const { ipcMain } = require('electron')
const HomeStore = require('electron-store')
const { channels } = require('../../src/shared/constants')

ipcMain.on(channels.GET_HOME, (event) => {
  console.log('GET_HOME')

  const defaultWelcomeRoomPath = process.env.BINARY_BUILD
    ? path.join(__dirname, '../../default-welcome-room')
    : './public/default-welcome-room'

  const defaultHome = {
    connections: {
      [defaultWelcomeRoomPath]: {
        room: 'welcome-room',
        connector: 'file',
      },
    },
    focus: {
      roomId: 'welcome-room',
      dioryId: 'welcome-room',
    },
  }

  const store = new HomeStore()
  const home = store.get('home') || defaultHome

  event.reply(channels.GET_HOME, home)
})
