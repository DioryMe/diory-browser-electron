import { fetchFile } from './fileClient'

const { ipcRenderer } = window

export const connect = (channel, params) => {
  if (!ipcRenderer) {
    return fetchFile(channel, params)
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
