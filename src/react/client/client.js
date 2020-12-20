import { mockResponse } from './client.mock'

// Production loading
let { ipcRenderer } = window

// Tests / development don't find it from window
if (!ipcRenderer) {
  try {
    // Tests wants to load it from 'electron'...
    ipcRenderer = require('electron').ipcRenderer
  } catch (TypeError) {
    // ...but development prefers mocking!
    ipcRenderer = undefined
  }
}

export const openChannel = (channel, params) => {
  // Development uses this
  if (!ipcRenderer) {
    console.log('IPC client mock response', channel, params)
    return mockResponse(channel, params)
  }

  return new Promise((resolve, reject) => {
    console.log('-------------')
    console.log('IPC client send:', channel, params)
    ipcRenderer.send(channel, params)
    ipcRenderer.on(channel, (event, success, err) => {
      console.log('-------------')
      if (err) {
        console.log('IPC client reject:', channel, err)
        reject(err)
      }
      console.log('IPC client success:', channel, success)
      resolve(success)
      ipcRenderer.removeAllListeners(channel)
    })
  })
}
