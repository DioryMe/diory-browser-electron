const { ipcMain } = require('electron')
const HomeStore = require('electron-store')
const { channels } = require('../../src/shared/constants')

ipcMain.on(channels.SAVE_HOME, (event, home) => {
  console.log('SAVE_HOME', home)

  if (false) {
    // if (process.env.TESTCAFE != 1) {
    const store = new HomeStore()
    store.set({ home })
  }

  event.reply(channels.SAVE_HOME, true)
})
