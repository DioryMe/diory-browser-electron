import { mockResponse } from './client.mock'
import { invokeAlertDialog } from './alertDialog'

export const invokeChannel = (channel, params) => {
  // Development uses mock responses
  if (process.env.NODE_ENV === 'development') {
    return mockResponse(channel, params)
  }

  // Called when backend successfully responds (response object or Error object)
  const success = (responseObject) => {
    if (responseObject instanceof Error) {
      invokeAlertDialog(responseObject)
    }
    return responseObject
  }

  // Called when backend throws error
  const error = (errorObject) => {
    invokeAlertDialog(errorObject)
    return {}
  }

  return window.channelsApi[channel](params).then(success, error)
}
