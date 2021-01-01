import { ipcRenderer } from 'electron'
import { invokeChannel } from './client'
import { invokeAlertDialog } from './alertDialog'

jest.mock('electron', () => ({ ipcRenderer: { invoke: jest.fn() } }), { virtual: true })
jest.mock('./alertDialog', () => ({ invokeAlertDialog: jest.fn() }))

const logInfoMock = jest.fn()
const logErrorMock = jest.fn()
window.frontendLogger = { info: logInfoMock, error: logErrorMock }

describe('invokeChannel', () => {
  it('normal response', async () => {
    const ipcRendererInvokeMock = ipcRenderer.invoke.mockResolvedValue('response')

    const params = { these: 'are', the: 'parameters' }
    const channel = 'MY_CHANNEL'

    const response = await invokeChannel(channel, params)

    expect(ipcRendererInvokeMock).toHaveBeenCalledTimes(1)
    expect(ipcRendererInvokeMock).toHaveBeenCalledWith(channel, params)
    expect(response).toEqual('response')

    expect(logInfoMock).toHaveBeenCalledTimes(2)
    expect(logInfoMock).toHaveBeenCalledWith('Frontend IPC invoke:', channel, params)
    expect(logInfoMock).toHaveBeenCalledWith('Frontend IPC response:', channel, 'response')
  })

  it('error response', async () => {
    const errorObject = new Error('something went wrong')
    const ipcRendererInvokeMock = ipcRenderer.invoke.mockRejectedValue(errorObject)

    const params = { these: 'are', the: 'parameters' }
    const channel = 'MY_CHANNEL'

    const response = await invokeChannel(channel, params)

    expect(ipcRendererInvokeMock).toHaveBeenCalledTimes(1)
    expect(ipcRendererInvokeMock).toHaveBeenCalledWith(channel, params)
    expect(response).toEqual({})

    expect(invokeAlertDialog).toHaveBeenCalledTimes(1)
    expect(invokeAlertDialog).toHaveBeenCalledWith(errorObject)

    expect(logInfoMock).toHaveBeenCalledTimes(1)
    expect(logInfoMock).toHaveBeenCalledWith('Frontend IPC invoke:', channel, params)

    expect(logErrorMock).toHaveBeenCalledTimes(1)
    expect(logErrorMock).toHaveBeenCalledWith('ERROR: Frontend IPC response:', channel, errorObject)
  })
})
