const HomeStore = require('electron-store')

exports.saveHomeEventHandler = (event, home) => {
  const store = new HomeStore({
    cwd: process.env.TESTCAFE_TEST ? process.env.PWD : undefined,
  })
  store.set({ home })

  return new Promise((resolve, reject) => {
    resolve(true)
  })
}
