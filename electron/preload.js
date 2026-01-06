const { contextBridge, shell, ipcRenderer } = require('electron')
const { fileURLToPath } = require('url')

const { LocalClient } = require('@diograph/local-client')
const { channels } = require('../src/shared/constants')

const { getHomeAddress } = require('./lib/getHomeAddress')
const { saveHomeAddress } = require('./lib/saveHomeAddress')

contextBridge.exposeInMainWorld('localClient', new LocalClient())

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
  [channels.GET_HOME_ADDRESS]: (params) => channelLogger(getHomeAddress, params),
  [channels.SAVE_HOME_ADDRESS]: (params) => channelLogger(saveHomeAddress, params),
  [channels.OPEN_FOLDER]: async (fileUrl) => shell.showItemInFolder(fileURLToPath(fileUrl)),
  openItemInDesktopManner: (fileUrl) => shell.openPath(fileURLToPath(fileUrl)),
  [channels.OPEN_IN_BROWSER]: (url) => shell.openExternal(url),
  showOpenDialog: () => ipcRenderer.invoke('showOpenDialog'),
})

contextBridge.exposeInMainWorld('processEnv', {
  TESTCAFE_TEST: process.env.TESTCAFE_TEST,
  PWD: process.env.PWD,
})
