const fs = require('fs')
const util = require('util')

const writeFilePromise = util.promisify(fs.writeFile)

export const getRoom = (path) => {
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

export const saveRoom = async (path, diograph) => {
  const data = JSON.stringify(diograph)
  console.log('Saving room', path)
  return writeFilePromise(`${path}/diograph.json`, data)
}

/**
 * Event handler for GET_ROOM channel
 * @function
 * @param event {Object} - Event from frontend via ipcMain
 * @param params {Object} - Uses only address key which is the folder path
 * @return {Promise} Resolves with object with diograph key with diograph as Object
 */
export const handleGetRoomEvent = (event, { address }) =>
  new Promise((resolve, reject) => {
    resolve({ channelName: 'GET_ROOM', responseObject: getRoom(address) })
  })
