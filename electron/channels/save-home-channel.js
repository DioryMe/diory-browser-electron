const { ipcMain } = require('electron')
const HomeStore = require('electron-store')
const { channels } = require('../../src/shared/constants')

ipcMain.on(channels.SAVE_HOME, (event, home) => {
  console.log('SAVE_HOME')

  const store = new HomeStore()
  // store.set({ home })
  console.log(home)

  event.reply(channels.SAVE_HOME, home)
})
