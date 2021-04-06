import { invokeChannel } from '../../../client/client'
import { channels } from '../../../../shared/constants'

export async function generateStravaDiorys(filePath) {
  return invokeChannel(channels.GENERATE_STRAVA_DIORYS, { filePath })
}
