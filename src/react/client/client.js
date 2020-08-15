import { mockResponse } from './client.mock'

const { ipcRenderer } = window

export const openChannel = (channel, params) => {
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
