const fs = require('fs')
const { posix: path } = require('path')

exports.readJson = function readJson(fileName) {
  return (folderPath) => {
    if (!fs.existsSync(folderPath)) {
      throw new Error(`Folder does not exist: ${folderPath}`)
    }

    const filePath = path.join(folderPath, fileName)
    if (!fs.existsSync(filePath)) {
      throw new Error(`File does not exist: ${filePath}`)
    }
    let raw
    try {
      raw = fs.readFileSync(filePath)
    } catch (error) {
      console.error(error)
      throw new Error(`Json reading failed: ${filePath}`)
    }

    let json
    try {
      json = JSON.parse(raw)
    } catch (error) {
      console.error(error)
      throw new Error(`Json is malformed: ${filePath}`)
    }

    console.info('Json read', filePath)
    return json
  }
}
