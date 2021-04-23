const { readDiographJson } = require('../lib/read-diograph-json')

exports.getRoomEventHandler = async function getRoomEventHandler(event, { address }) {
  return readDiographJson(address)
}
