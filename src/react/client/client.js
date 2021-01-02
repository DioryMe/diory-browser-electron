import { mockResponse } from './client.mock'
import { invokeAlertDialog } from './alertDialog'

let { ipcRenderer } = window

if (process.env.NODE_ENV === 'test') {
  ipcRenderer = require('electron').ipcRenderer
}

if (process.env.NODE_ENV === 'development') {
  ipcRenderer = undefined
  window.frontendLogger = { info: console.log, error: console.error }
}

/**
 * Sends an event to given channel with given parameters
 *
 * @param Channel name
 * @param Parameters
 *
 * @return Promise -> resolves with responseObject, rejects on Error object
 *
 * @example invokeChannel(channels.GENERATE_DIOGRAPH, address)
 *
 */
export const invokeChannel = (channel, params) => {
  // Development uses mock responses
  if (process.env.NODE_ENV === 'development') {
    window.frontendLogger.info('MOCK: Frontend IPC invoke', channel, params)
    return mockResponse(channel, params)
  }

  window.frontendLogger.info('Frontend IPC invoke:', channel, params)

  const success = (responseObject) => {
    window.frontendLogger.info('Frontend IPC response:', channel, responseObject)
    return responseObject
  }

  const error = (errorObject) => {
    window.frontendLogger.error('ERROR: Frontend IPC response:', channel, errorObject)
    invokeAlertDialog(errorObject)
    return {}
  }

  return ipcRenderer.invoke(channel, params).then(success, error)
}
