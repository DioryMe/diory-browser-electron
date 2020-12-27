const { saveRoom } = require('../lib/room-util')

export const saveRoomEventHandler = (event, { path, room: { id, diograph } }) =>
  new Promise((resolve, reject) =>
    saveRoom(path, diograph).then(
      (responseObject) => {
        resolve(true)
      },
      (error) => {
        reject(error)
      }
    )
  )
