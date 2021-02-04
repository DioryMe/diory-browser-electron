const fs = require('fs')
const util = require('util')

// No need to promisify: https://stackoverflow.com/a/52094177/1957884
// - "Starting in Node v10 you can use await fs"
const writeFilePromise = util.promisify(fs.writeFile)

/**
 * readDiographJSON
 * @function
 * @param path {string} - Path as string
 * @return {Object} - Object with diograph as key and parsed diograph.json content as value
 *
 * @example Response object:
 * {
 *   diograph: {
 *      diory1: { id: 'diory1', image: '...', links: [...] },
 *      diory2: { id: 'diory2', image: '...', links: [...] }
 *   }
 * }
 *
 */
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
