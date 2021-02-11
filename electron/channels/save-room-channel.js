const { saveDiographJson } = require('../lib/save-diograph-json')

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
