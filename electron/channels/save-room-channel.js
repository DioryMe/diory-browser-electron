const { saveDiographJson } = require('../lib/save-diograph-json')

exports.saveRoomEventHandler = async function saveRoomEventHandler({
  diographJsonPath,
  rootId,
  diograph,
}) {
  await saveDiographJson({ diographJsonPath, diograph, rootId })
  return true
}
