const { saveDiographJSON } = require('../lib/room-util')

exports.saveRoomEventHandler = (event, { path, room: { rootId, diograph } }) =>
  new Promise((resolve, reject) => {
    saveDiographJSON(path, diograph, rootId).then(
      (responseObject) => {
        resolve(true)
      },
      (error) => {
        reject(error)
      }
    )
  })
