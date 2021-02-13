const HomeStore = require('electron-store')

exports.saveHomeEventHandler = async function (event, home) {
  const store = new HomeStore({
    cwd: process.env.TESTCAFE_TEST ? `${process.env.PWD}/tmp/${Date.now()}` : undefined,
  })
  store.set({ home })

  return true
}
