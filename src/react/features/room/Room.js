import { useGetRoomEffect } from './useGetRoomEffect'
import { useSaveRoomEffect } from './useSaveRoomEffect'

export const Room = () => {
  useGetRoomEffect()
  useSaveRoomEffect()

  return null
}
