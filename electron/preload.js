const { ipcRenderer } = require('electron')
window.ipcRenderer = ipcRenderer

const { dialog } = require('electron').remote
window.nativeFileDialog = dialog
