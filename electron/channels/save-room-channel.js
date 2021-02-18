const { saveDiographJson } = require('../lib/save-diograph-json')

exports.saveRoomEventHandler = async function saveRoomEventHandler(
  event,
  { path, room: { rootId, diograph } }
) {
  await saveDiographJson(path, diograph, rootId)
  return true
}
