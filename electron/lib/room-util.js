const fs = require('fs');
const FolderTools = require('../lib/diograph-folder-tools')

const getRoom = async (id) => {
  let folderPath = id
  let diographJSONPath = `${id}/diograph.json`

  // With FileDialog you shouldn't be able to choose a folderPath that doesn't exist but...
  if (!fs.existsSync(folderPath)) {
    return null
  }

  // No need to read the whole folder if diograph.json exists
  if (fs.existsSync(diographJSONPath)) {
    const diograph = require(`${id}/diograph.json`)
    return { id, diograph }
  }

  const diograph = await FolderTools.generateDiograph(id)
  return { id, diograph }
}

const saveRoom = async (id, diograph, callback) => {
  const data = JSON.stringify(diograph)
  console.log('Saving room', id)
  fs.writeFile(`${id}/diograph.json`, data, callback)
}

exports.getRoom = getRoom
exports.saveRoom = saveRoom
