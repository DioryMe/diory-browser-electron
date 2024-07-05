import { useSelector } from '../../store'

export const useDiosphere = () => {
  const { roomId } = useSelector((state) => state.navigation)
  const { rooms = {} } = useSelector((state) => state.diosphere)
  const homeRoom = rooms['/'] || {}
  const room = rooms[roomId] || rooms[homeRoom.id] || {}
  return {
    homeRoomId: homeRoom.id,
    room,
    rooms: Object.entries(rooms)
      .filter(([key]) => key !== '/')
      .map(([, room]) => room),
  }
}
