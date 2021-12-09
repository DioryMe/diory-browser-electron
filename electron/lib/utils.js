const fs = require('fs')
const path = require('path')
const SettingsStore = process.env.NODE_ENV === 'test' ? {} : require('electron-store')

exports.isEmpty = function isEmpty(obj) {
  return typeof obj === 'object' && Object.keys(obj).length === 0
}

exports.directoryExists = function directoryExists(folderPath) {
  return fs.existsSync(folderPath) && fs.lstatSync(folderPath).isDirectory()
}

exports.settingsStore = function settingsStore() {
  return new SettingsStore({
    // E2E tests needs to create config.json file to a different path every time
    cwd: process.env.TESTCAFE_TEST ? `${process.env.PWD}/tmp/${Date.now()}` : undefined,
  })
}

exports.copyFolderRecursiveSync = function copyFolderRecursiveSync(source, target) {
  if (!fs.lstatSync(source).isDirectory()) {
    throw new Error(`copyFolderRecursiveSync: source folder (${source}) is not a folder!`)
  }

  fs.readdirSync(source).forEach((itemName) => {
    const sourcePath = path.join(source, itemName)
    const targetPath = path.join(target, itemName)

    if (fs.lstatSync(sourcePath).isDirectory()) {
      fs.mkdirSync(targetPath)
      exports.copyFolderRecursiveSync(sourcePath, targetPath)
    } else {
      fs.copyFileSync(sourcePath, targetPath)
    }
  })
}
