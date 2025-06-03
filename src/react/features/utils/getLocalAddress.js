import { invokeChannel } from '../../client/client'

export const getLocalAddress = async () => {
  const { filePaths } = await invokeChannel('showOpenDialog')
  return filePaths.length ? `LocalClient/${filePaths[0]}/` : null
}
