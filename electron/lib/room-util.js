const fs = require('fs')
const util = require('util')
const writeFilePromise = util.promisify(fs.writeFile)

const getRoom = async (path) => {
  let folderPath = path
  let diographJSONPath = `${path}/diograph.json`

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

const saveRoom = async (path, diograph) => {
  const data = JSON.stringify(diograph)
  console.log('Saving room', path)
  return writeFilePromise(`${path}/diograph.json`, data)
}

exports.getRoom = getRoom
exports.saveRoom = saveRoom
