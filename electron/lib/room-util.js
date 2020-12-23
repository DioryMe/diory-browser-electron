const fs = require('fs')
const util = require('util')

// No need to promisify: https://stackoverflow.com/a/52094177/1957884
// - "Starting in Node v10 you can use await fs"
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
  // No need to promisify: https://stackoverflow.com/a/52094177/1957884
  // - "Starting in Node v10 you can use await fs"
  return writeFilePromise(`${path}/diograph.json`, data)
}
