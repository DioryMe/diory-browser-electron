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
  // Development uses this
  if (!ipcRenderer) {
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

export const invokeAlertDialog = (message) => {
  // alert(message)
}
