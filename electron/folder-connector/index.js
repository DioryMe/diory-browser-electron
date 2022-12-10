const { contextBridge } = require('electron')

const { getDiograph } = require('./getDiograph')
const { saveDiograph } = require('./saveDiograph')

contextBridge.exposeInMainWorld('folderConnector', {
  getDiograph,
  saveDiograph,
})
