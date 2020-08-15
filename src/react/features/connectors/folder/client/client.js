import { channels } from '../../../../../shared/constants'
import { openChannel } from '../../../../client/client'

export const getRoomClient = (address) => openChannel(channels.GET_ROOM, address)

export const saveRoomClient = (path, room) => openChannel(channels.SAVE_ROOM, { path, room })
