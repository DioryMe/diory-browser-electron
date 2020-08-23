const { ipcMain } = require('electron')
const HomeStore = require('electron-store')
const { channels } = require('../../src/shared/constants')

ipcMain.on(channels.GET_HOME, (event) => {
  console.log('GET_HOME')

  const defaultHome = {
    connections: {
      './public/default-welcome-room': {
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
