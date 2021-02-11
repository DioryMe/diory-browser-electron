const { saveDiographJson } = require('../lib/room-util')

exports.saveRoomEventHandler = (event, { path, room: { rootId, diograph } }) =>
  new Promise((resolve, reject) => {
    saveDiographJson(path, diograph, rootId).then(
      (responseObject) => {
        resolve(true)
      },
      (error) => {
        reject(error)
      }
    )
  })
