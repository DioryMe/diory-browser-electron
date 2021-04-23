import { mockResponse } from './client.mock'
import { invokeAlertDialog } from './alertDialog'

let { ipcRenderer } = window

if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line prefer-destructuring
  ipcRenderer = require('electron').ipcRenderer
  window.frontendLogger = { info: () => {}, error: () => {} }
}

if (process.env.NODE_ENV === 'development') {
  ipcRenderer = undefined
  window.frontendLogger = { info: console.log, error: console.error }
}

export const invokeChannel = (channel, params) => {
  // Development uses mock responses
  if (process.env.NODE_ENV === 'development') {
    window.frontendLogger.info('MOCK: Frontend IPC invoke:', channel, params)
    return mockResponse(channel, params)
  }

  window.frontendLogger.info(
    'Frontend IPC invoke:',
    channel,
    channel === 'SAVE_ROOM' ? params.path : params
  )

  // Called when backend successfully responds (response object or Error object)
  const success = (responseObject) => {
    if (responseObject instanceof Error) {
      invokeAlertDialog(responseObject)
    }
    window.frontendLogger.info(
      'Frontend IPC response:',
      channel,
      channel === 'GET_ROOM' && responseObject ? responseObject.rootId : responseObject
    )
    return responseObject
  }

  // Called when backend throws error
  const error = (errorObject) => {
    window.frontendLogger.error('ERROR: Frontend IPC response:', channel, errorObject)
    invokeAlertDialog(errorObject)
    return {}
  }

  return ipcRenderer.invoke(channel, params).then(success, error)
}
