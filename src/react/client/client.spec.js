import { ipcRenderer } from 'electron'
import { invokeChannel } from './client'

jest.mock('electron', () => ({ ipcRenderer: { invoke: jest.fn() } }), { virtual: true })
const ipcRendererInvokeMock = ipcRenderer.invoke.mockResolvedValue('response')

// window.frontendLogger = jest.fn()

describe('invokeChannel', () => {
  it('works', async () => {
    const params = { these: 'are', the: 'parameters' }
    const channel = 'MY_CHANNEL'

    const response = await invokeChannel(channel, params)

    expect(ipcRendererInvokeMock).toHaveBeenCalledTimes(1)
    expect(ipcRendererInvokeMock).toHaveBeenCalledWith(channel, params)
    expect(response).toEqual('response')
  })
})
