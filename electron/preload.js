const { contextBridge, shell, ipcRenderer } = require('electron')
const { fileURLToPath } = require('url')

const { channels } = require('../src/shared/constants')

const { getHomeConnection } = require('./lib/getHomeConnection')
const { saveHomeConnection } = require('./lib/saveHomeConnection')
const { featureIsEnabled } = require('./lib/utils')

// Feature flags
process.env.FEATURE_DCLI_ADAPTER = '1'
contextBridge.exposeInMainWorld('featureIsEnabled', featureIsEnabled)

if (featureIsEnabled('DCLI_ADAPTER')) {
  const { DcliAdapter } = require('./dcliAdapter')
  const dcliAdapter = new DcliAdapter()
  contextBridge.exposeInMainWorld('dcliAdapter', dcliAdapter)
} else {
  const { LocalClient } = require('@diograph/local-client')
  contextBridge.exposeInMainWorld('localClient', new LocalClient())
}

function channelLogger(handler, params) {
  console.log(`BACK-REQ: ${handler.name} called with`, params)
  const response = handler(params)
  response.then((solvedResponse) => {
    console.log(`BACK-RES: ${handler.name} responded with`, solvedResponse)
  })
  return response
}

// NOTE: Currently channels using channelLogger can receive only one parameter!
// NOTE2: All functions used as channels must return a Promise!
contextBridge.exposeInMainWorld('channelsApi', {
  [channels.GET_DIORY_HOME_CONNECTION]: (params) => channelLogger(getHomeConnection, params),
  [channels.SAVE_DIORY_HOME_CONNECTION]: (params) => channelLogger(saveHomeConnection, params),
  [channels.OPEN_FOLDER]: async (fileUrl) => shell.showItemInFolder(fileURLToPath(fileUrl)),
  openItemInDesktopManner: (fileUrl) => shell.openPath(fileURLToPath(fileUrl)),
  [channels.OPEN_IN_BROWSER]: (url) => shell.openExternal(url),
  showOpenDialog: () => ipcRenderer.invoke('showOpenDialog'),
})

contextBridge.exposeInMainWorld('processEnv', {
  TESTCAFE_TEST: process.env.TESTCAFE_TEST,
  PWD: process.env.PWD,
})
