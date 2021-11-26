import { invokeChannel } from './client'
import { invokeAlertDialog } from './alertDialog'

jest.mock('./alertDialog', () => ({ invokeAlertDialog: jest.fn() }))

window.channelsApi = {
  MY_CHANNEL: jest.fn(),
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
  })
})
