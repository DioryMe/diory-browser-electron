const { saveDiographJSON } = require('../lib/room-util')

// NOTE: This is SAVE_ROOM channel which calls saveDiographJSON
exports.saveRoomEventHandler = (event, { path, room: { id, diograph } }) =>
  new Promise((resolve, reject) => {
    console.log('RootId:', id)
    // NOTE: Here it's id but in saveDiographJSON it's rootId
    saveDiographJSON(path, diograph, id).then(
      (responseObject) => {
        resolve(true)
      },
      (error) => {
        reject(error)
      }
    )
  })
