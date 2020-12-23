const HomeStore = require('electron-store')
const { channels } = require('../../src/shared/constants')

export const saveHomeEventHandler = (event, home) => {
  const store = new HomeStore()
  store.set({ home })

  event.reply(channels.SAVE_HOME, true)
}
