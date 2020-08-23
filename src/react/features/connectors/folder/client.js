import { channels } from '../../../../shared/constants'
import { openChannel } from '../../../client/client'

export const getRoom = (address) => openChannel(channels.GET_ROOM, address)

export const saveRoom = (path, room) => openChannel(channels.SAVE_ROOM, { path, room })
