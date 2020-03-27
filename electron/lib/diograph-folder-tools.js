const Extractor = require('./diograph-extractor')
const path = require('path')
const fs = require('fs')
const { saveRoom } = require('./room-util')

// Copy-pasted from:
// - https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
const { resolve } = require('path')
const { readdir } = require('fs').promises

async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    dirents.map(dirent => {
      const filePath = resolve(dir, dirent.name)
      return dirent.isDirectory() ? getFiles(filePath) : { filePath }
    })
  )
  const links = Array.prototype.concat(...files)
  return links.concat([{ filePath: dir, links }])
}
// end of copy-paste

exports.listFiles = async function(folderPath) {
  if (!(fs.existsSync(folderPath) && fs.lstatSync(folderPath).isDirectory())) {
    console.log('NOT A FOLDER PATH')
    return
  }
  return getFiles(folderPath)
}

function arrayToObject(obj, item) {
  return {
    ...obj,
    [item.id]: item,
  }
}

exports.generateDiograph = async function(folderPath) {
  const filePathList = await this.listFiles(folderPath)

  const diograph = filePathList.map(Extractor.createDiory).reduce(arrayToObject, {})

  await saveRoom(folderPath, diograph)
  return diograph
}

exports.generateRoom = async function(folderPath) {
  return {
    id: folderPath,
    text: path.basename(folderPath),
  }
}
