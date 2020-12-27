const HomeStore = require('electron-store')

export const saveHomeEventHandler = (event, home) => {
  const store = new HomeStore()
  store.set({ home })

  return new Promise((resolve, reject) => {
    resolve(true)
  })
}
