const { ipcRenderer } = window

export const fetchData = (channel, data) =>
  new Promise((resolve, reject) => {
    ipcRenderer.send(channel, data)
    ipcRenderer.on(channel, (event, success, err) => {
      if (err) {
        reject(err)
      }
      resolve(success)
      ipcRenderer.removeAllListeners(channel)
    })
  })
