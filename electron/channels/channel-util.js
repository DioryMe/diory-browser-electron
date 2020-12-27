/**
 * Wraps (1) generic IPC channel logging and (2) error handling
 * around the eventHandler function and (3) resolves its promise
 * and (4) replies to the IPC event from frontend
 *
 * @param {string} channelName - Function which returns Promise which resolves with {Object} and rejects with {Error}
 * @param {function(): Promise} eventHandler - Promise which resolves with responseObject and rejects with errorObject
 * @return {function(): void} Specific eventHandler function to be given for ipcMain.on as a second argument
 */
export const eventHandlerWrapper = (channelName, eventHandler) => {
  const specificEventHandler = (event, params) => {
    const success = (responseObject) => {
      console.log(`Backend IPC reply: ${channelName}, `, responseObject)
      event.reply(channelName, responseObject)
    }

    const err = (e) => {
      console.log(`ERROR: Backend IPC reply: ${channelName}, `, e.message)
      event.reply(channelName, e)
    }

    eventHandler(event, params).then(success, err)
  }

  return specificEventHandler
}
