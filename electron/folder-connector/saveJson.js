const fsPromise = require('fs').promises
const path = require('path').posix

exports.saveJson = function saveJson(fileName) {
  return async (folderPath, json) => {
    const filePath = path.join(folderPath, fileName)
    const fileContent = JSON.stringify(json, null, 2)
    try {
      await fsPromise.writeFile(filePath, fileContent)
      console.log(`Saved json: ${filePath}`)
    } catch (error) {
      console.error(error)
      throw new Error(`Json saving failed: ${filePath}`)
    }
  }
}
