const HomeStore = require('electron-store')
const { channels } = require('../../src/shared/constants')

export const saveHomeEventHandler = (event, home) => {
  const store = new HomeStore()
  store.set({ home })

  return new Promise((resolve, reject) => {
    resolve({ channelName: channels.SAVE_HOME, responseObject: true })
  })
}
