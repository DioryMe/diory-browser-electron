const { readDiographJson } = require('../lib/read-diograph-json')

exports.getRoomEventHandler = async function getRoomEventHandler({ address }) {
  return readDiographJson(address)
}
