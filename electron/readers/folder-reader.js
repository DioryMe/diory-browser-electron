const { existsSync, lstatSync, promises, statSync } = require('fs')
const { basename } = require('path')
const { isFile, isFolder, getPath } = require('./dirent-reader')

exports.readPaths = async function readPaths(folderPath) {
  if (!(existsSync(folderPath) && lstatSync(folderPath).isDirectory())) {
    throw new Error(`Path is not folder ${folderPath}`)
  }
  const dirents = await promises.readdir(folderPath, { withFileTypes: true })
  return {
    files: dirents.filter(isFile).map(getPath(folderPath)),
    subfolders: dirents.filter(isFolder).map(getPath(folderPath)),
  }
}

exports.readFolder = function readFolder(folderPath = '') {
  const { birthtime, mtime } = statSync(folderPath) || {}
  return {
    text: basename(folderPath),
    created: birthtime && birthtime.toISOString(),
    modified: mtime && mtime.toISOString(),
  }
}
