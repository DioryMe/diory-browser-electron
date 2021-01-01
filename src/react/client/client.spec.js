import { ipcRenderer } from 'electron'
import { invokeChannel } from './client'

jest.mock('electron', () => ({ ipcRenderer: { invoke: jest.fn() } }), { virtual: true })
const ipcRendererInvokeMock = ipcRenderer.invoke.mockResolvedValue('response')

const logInfoMock = jest.fn()
const logInfoError = jest.fn()
window.frontendLogger = { info: logInfoMock, error: logInfoError }

describe('invokeChannel', () => {
  it('works', async () => {
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
})
