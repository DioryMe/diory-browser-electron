import { channels } from '../../shared/constants'

const { ipcRenderer } = window

export const updateRoom = (room) => new Promise((resolve, reject) => {
  ipcRenderer.send(channels.UPDATE_ROOM, room)
  ipcRenderer.on(channels.UPDATE_ROOM, (event, success, err) => {
    if (err) {
      reject(err)
    }
    resolve(success)
  })
})
