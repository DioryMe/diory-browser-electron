const { saveDiographJSON } = require('../lib/room-util')

// NOTE: This is SAVE_ROOM channel which calls saveDiographJSON
exports.saveRoomEventHandler = (event, { path, room: { rootId, diograph } }) =>
  new Promise((resolve, reject) => {
    console.log('RootId:', rootId)
    // NOTE: Here it's id but in saveDiographJSON it's rootId
    saveDiographJSON(path, diograph, rootId).then(
      (responseObject) => {
        resolve(true)
      },
      (error) => {
        reject(error)
      }
    )
  })
