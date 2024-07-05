export const getParentIds = (roomId, rooms) => {
  if (!roomId || !Object.keys(rooms).length) {
    return []
  }

  const parentIds = Object.entries(rooms).find(([, { doors = [] }]) =>
    doors.some(({ id }) => id === roomId)
  )

  if (!parentIds) {
    return [roomId]
  }

  return [roomId].concat(getParentIds(parentIds[0], rooms))
}
