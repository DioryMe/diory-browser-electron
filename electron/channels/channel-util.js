const backendLogger = require('electron-log')

if (process.env.NODE_ENV === 'test') {
  backendLogger.transports = null
}

/**
 * Wraps (1) generic IPC channel logging and (2) error handling
 * around the eventHandler function and (3) resolves its promise
 * and (4) replies to the IPC event from frontend
 *
 * @param {string} channelName - IPC channel to be used to reply to the event
 * @param {function(): Promise} eventHandler - Promise which resolves with responseObject and rejects with errorObject
 * @return {function(): void} Specific eventHandler function to be given for ipcMain.on as a second argument
 */
exports.eventHandlerWrapper = function eventHandlerWrapper(channelName, eventHandler) {
  function specificEventHandler(params) {
    function success(responseObject) {
      backendLogger.info(
        'Backend IPC response:',
        channelName,
        channelName === 'GET_ROOM' && responseObject ? responseObject.rootId : responseObject
      )
      return responseObject
    }

    function err(e) {
      backendLogger.error('ERROR: Backend IPC response:', channelName, e.message)
      return e
    }

    backendLogger.info(
      'Backend IPC event handler triggered:',
      channelName,
      channelName === 'SAVE_ROOM' ? params.path : params
    )
    return eventHandler(params).then(success, err)
  }

  return specificEventHandler
}
