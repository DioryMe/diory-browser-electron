export const getParentIds = (rootId, roomId, rooms) => {
  if (!roomId || !Object.keys(rooms).length) {
    return []
  }

  if (roomId === rootId) {
    return [rootId]
  }

  const parentId = Object.entries(rooms).find(([, { doors = [] }]) =>
    doors.some(({ id }) => id === roomId)
  )[0]

  return [roomId].concat(getParentIds(rootId, parentId, rooms))
}
