import { invokeChannel } from '../../../client/client'

export const getFolderPath = async () => {
  const { filePaths } = await invokeChannel('showOpenDialog')
  return `LocalClient/${filePaths[0]}/`
}
