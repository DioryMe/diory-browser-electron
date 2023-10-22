import { useSelector } from '../../store'

export const useDiosphere = () => {
  const { roomId } = useSelector((state) => state.navigation)
  const { rooms = {} } = useSelector((state) => state.diosphere)
  const homeRoom = rooms['/'] || {}
  const room = rooms[roomId] || rooms[homeRoom.id] || {}
  return {
    room,
  }
}
