export const getHomeRoomId = (rooms = {}) => {
  const { id } = rooms['/'] || {}
  return id
}
