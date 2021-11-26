const backendLogger = require('electron-log')

if (process.env.NODE_ENV === 'test') {
  backendLogger.transports = null
}

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
