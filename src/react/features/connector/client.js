import { mockResponse } from './client.mock'

const { ipcRenderer } = window

export const connect = (channel, params) => {
  if (!ipcRenderer) {
    console.log('Using mock response')
    return mockResponse(channel, params)
  }

  return new Promise((resolve, reject) => {
    ipcRenderer.send(channel, params)
    ipcRenderer.on(channel, (event, success, err) => {
      if (err) {
        reject(err)
      }
      resolve(success)
      ipcRenderer.removeAllListeners(channel)
    })
  })
}
