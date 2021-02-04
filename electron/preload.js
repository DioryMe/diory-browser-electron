const { ipcRenderer } = require('electron')

window.ipcRenderer = ipcRenderer

const { dialog } = require('electron').remote

window.nativeFileDialog = dialog

const frontendLogger = require('electron-log')

window.frontendLogger = frontendLogger.functions

window.processEnv = {}
window.processEnv.TESTCAFE_TEST = process.env.TESTCAFE_TEST
window.processEnv.DIOGRAPH_FOLDER_PATH = process.env.DIOGRAPH_FOLDER_PATH
window.processEnv.PWD = process.env.PWD
