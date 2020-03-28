const fs = require('fs')
const util = require('util')
const FolderTools = require('./diograph-folder-tools')
const writeFilePromise = util.promisify(fs.writeFile)

const getRoom = async (id) => {
  let folderPath = id
  let diographJSONPath = `${id}/diograph.json`

  // With FileDialog you shouldn't be able to choose a folderPath that doesn't exist but...
  if (!fs.existsSync(folderPath)) {
    return null
  }

  // No need to read the whole folder if diograph.json exists
  if (fs.existsSync(diographJSONPath)) {
    const raw = fs.readFileSync(diographJSONPath)
    return {
      id,
      diograph: JSON.parse(raw),
    }
  }

  const diograph = await FolderTools.generateDiograph(id)
  return { id, diograph }
}

const saveRoom = async (id, diograph) => {
  const data = JSON.stringify(diograph)
  console.log('Saving room', id)
  return writeFilePromise(`${id}/diograph.json`, data)
}

exports.getRoom = getRoom
exports.saveRoom = saveRoom
