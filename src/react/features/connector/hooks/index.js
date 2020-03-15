import { useGetHome } from './useGetHome'
import { useGetRoom } from './useGetRoom'
import { useSaveHome } from './useSaveHome'
import { useSaveRoom } from './useSaveRoom'

export { useAddRoom } from './useAddRoom'

export const useChannel = () => {
  useGetHome()
  useSaveHome()
  useGetRoom()
  useSaveRoom()
}
