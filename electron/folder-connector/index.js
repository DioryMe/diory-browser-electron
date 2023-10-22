const { contextBridge } = require('electron')
const { readJson } = require('./readJson')
const { saveJson } = require('./saveJson')

contextBridge.exposeInMainWorld('folderConnector', {
  getDiograph: readJson('diograph.json'),
  saveDiograph: saveJson('diograph.json'),
  getDiosphere: readJson('diosphere.json'),
  saveDiosphere: saveJson('diosphere.json'),
})
