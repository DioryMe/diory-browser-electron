import { invokeChannel } from './client'
import { invokeAlertDialog } from './alertDialog'

jest.mock('./alertDialog', () => ({ invokeAlertDialog: jest.fn() }))

const logInfoMock = jest.fn()
const logErrorMock = jest.fn()
window.channelsApi = {
  MY_CHANNEL: jest.fn(),
  frontendLogger: { info: logInfoMock, error: logErrorMock },
}

describe('invokeChannel', () => {
  it('normal response', async () => {
    const params = { these: 'are', the: 'parameters' }
    const channel = 'MY_CHANNEL'
    const channelsApiMock = window.channelsApi[channel].mockResolvedValue('response')

    const response = await invokeChannel(channel, params)

    expect(channelsApiMock).toHaveBeenCalledTimes(1)
    expect(channelsApiMock).toHaveBeenCalledWith(params)
    expect(response).toEqual('response')

    // expect(logInfoMock).toHaveBeenCalledTimes(2)
    // expect(logInfoMock).toHaveBeenCalledWith('Frontend IPC invoke:', channel, params)
    // expect(logInfoMock).toHaveBeenCalledWith('Frontend IPC response:', channel, 'response')
  })

  it('error response', async () => {
    const params = { these: 'are', the: 'parameters' }
    const channel = 'MY_CHANNEL'
    const errorObject = new Error('something went wrong')
    const channelsApiMock = window.channelsApi[channel].mockRejectedValue(errorObject)

    const response = await invokeChannel(channel, params)

    expect(channelsApiMock).toHaveBeenCalledTimes(1)
    expect(channelsApiMock).toHaveBeenCalledWith(params)
    expect(response).toEqual({})

    expect(invokeAlertDialog).toHaveBeenCalledTimes(1)
    expect(invokeAlertDialog).toHaveBeenCalledWith(errorObject)

    // expect(logInfoMock).toHaveBeenCalledTimes(1)
    // expect(logInfoMock).toHaveBeenCalledWith('Frontend IPC invoke:', channel, params)

    // expect(logErrorMock).toHaveBeenCalledTimes(1)
    // expect(logErrorMock).toHaveBeenCalledWith('ERROR: Frontend IPC response:', channel, errorObject)
  })
})
