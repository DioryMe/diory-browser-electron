import { mockResponse } from './client.mock'
import { invokeAlertDialog } from './alertDialog'

let frontendLogger = window.channelsApi.frontendLogger()

if (process.env.NODE_ENV === 'test') {
  frontendLogger = { info: () => {}, error: () => {} }
}

if (process.env.NODE_ENV === 'development') {
  frontendLogger = { info: console.log, error: console.error }
}

export const invokeChannel = (channel, params) => {
  // Development uses mock responses
  if (process.env.NODE_ENV === 'development') {
    frontendLogger.info('MOCK: Frontend IPC invoke:', channel, params)
    return mockResponse(channel, params)
  }

  frontendLogger.info(
    'Frontend IPC invoke:',
    channel,
    channel === 'SAVE_ROOM' ? params.path : params
  )

  // Called when backend successfully responds (response object or Error object)
  const success = (responseObject) => {
    if (responseObject instanceof Error) {
      invokeAlertDialog(responseObject)
    }
    frontendLogger.info(
      'Frontend IPC response:',
      channel,
      channel === 'GET_ROOM' && responseObject ? responseObject.rootId : responseObject
    )
    return responseObject
  }

  // Called when backend throws error
  const error = (errorObject) => {
    frontendLogger.error('ERROR: Frontend IPC response:', channel, errorObject)
    invokeAlertDialog(errorObject)
    return {}
  }

  return window.channelsApi[channel](params).then(success, error)
}
