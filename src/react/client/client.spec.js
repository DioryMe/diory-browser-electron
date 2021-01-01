import { ipcRenderer } from 'electron'
import * as ipcRendererClient from './client'

const { invokeChannel } = ipcRendererClient

jest.mock('electron', () => ({ ipcRenderer: { invoke: jest.fn() } }), { virtual: true })

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
    // Mock ipcRenderer.invoke to reject with Error object
    const errorObject = new Error('something went wrong')
    const ipcRendererInvokeMock = ipcRenderer.invoke.mockRejectedValue(errorObject)
    // Mock invokeAlertDialog
    jest.spyOn(ipcRendererClient, 'invokeAlertDialog').mockImplementation(() => undefined)

    const params = { these: 'are', the: 'parameters' }
    const channel = 'MY_CHANNEL'

    const response = await invokeChannel(channel, params)

    expect(ipcRendererInvokeMock).toHaveBeenCalledTimes(1)
    expect(ipcRendererInvokeMock).toHaveBeenCalledWith(channel, params)
    expect(response).toEqual({})

    // Tried to imitate 100%: https://github.com/facebook/jest/issues/936#issuecomment-545080082
    // - but these are failing :(
    // expect(ipcRendererClient.invokeAlertDialog).toHaveBeenCalledTimes(1)
    // expect(ipcRendererClient.invokeAlertDialog).toHaveBeenCalledWith('message')

    expect(logInfoMock).toHaveBeenCalledTimes(1)
    expect(logInfoMock).toHaveBeenCalledWith('Frontend IPC invoke:', channel, params)

    expect(logErrorMock).toHaveBeenCalledTimes(1)
    expect(logErrorMock).toHaveBeenCalledWith('ERROR: Frontend IPC response:', channel, errorObject)
  })
})
