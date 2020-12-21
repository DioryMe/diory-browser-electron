const fs = require('fs')
const util = require('util')

// No need to promisify: https://stackoverflow.com/a/52094177/1957884
// - "Starting in Node v10 you can use await fs"
const writeFilePromise = util.promisify(fs.writeFile)

exports.getRoom = (path) => {
  const folderPath = path
  const diographJSONPath = `${path}/diograph.json`

  // With FileDialog you shouldn't be able to choose a folderPath that doesn't exist but...
  if (!fs.existsSync(folderPath)) {
    return null
  }

  // No need to read the whole folder if diograph.json exists
  if (fs.existsSync(diographJSONPath)) {
    const raw = fs.readFileSync(diographJSONPath)
    return {
      diograph: JSON.parse(raw),
    }
  }
}

exports.saveRoom = async (path, diograph) => {
  const data = JSON.stringify(diograph, null, 2)
  console.log('Saving room', path)
  // No need to promisify: https://stackoverflow.com/a/52094177/1957884
  // - "Starting in Node v10 you can use await fs"
  return writeFilePromise(`${path}/diograph.json`, data)
}

/**
 * @function
 * @param {object} event - Event from frontend
 * @param {object} params - address
 * @return {object} Diograph
 */
export const handleGetRoomEvent = (event, { address }) => {
  console.log('GET_ROOM', address)
  getRoom(address).then(({ diograph }) => {
    event.sender.send(channels.GET_ROOM, { diograph })
  })
}
