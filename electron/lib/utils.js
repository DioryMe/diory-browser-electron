const fs = require('fs')
const SettingsStore = process.env.NODE_ENV === 'test' ? {} : require('electron-store')

exports.directoryExists = function directoryExists(folderPath) {
  return fs.existsSync(folderPath) && fs.lstatSync(folderPath).isDirectory()
}

exports.settingsStore = function settingsStore() {
  return new SettingsStore({
    // E2E tests needs to create config.json file to a different path every time
    cwd: process.env.TESTCAFE_TEST ? `${process.env.PWD}/tmp/${Date.now()}` : undefined,
  })
}
