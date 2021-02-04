const { saveDiographJSON } = require('../lib/room-util')

// NOTE: This is SAVE_ROOM channel which calls saveDiographJSON
exports.saveRoomEventHandler = (event, { path, room: { id, diograph } }) =>
  new Promise((resolve, reject) =>
    saveDiographJSON(path, diograph).then(
      (responseObject) => {
        resolve(true)
      },
      (error) => {
        reject(error)
      }
    )
  )
