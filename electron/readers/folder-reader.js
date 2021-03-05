const { existsSync, lstatSync, promises, statSync } = require('fs')
const { basename } = require('path')
const { isValid, isFile, isFolder, getPath } = require('./dirent-reader')

exports.getFileAndSubfolderPaths = async function getFileAndSubfolderPaths(folderPath) {
  if (!(existsSync(folderPath) && lstatSync(folderPath).isDirectory())) {
    throw new Error(`Path is not folder ${folderPath}`)
  }
  const dirents = await promises.readdir(folderPath, { withFileTypes: true })
  return {
    filePaths: dirents.filter(isFile).filter(isValid).map(getPath(folderPath)),
    subfolderPaths: dirents.filter(isFolder).map(getPath(folderPath)),
  }
}

exports.readFolderMetadata = function readFolderMetadata(folderPath = '') {
  const { birthtime, mtime } = statSync(folderPath) || {}
  return {
    text: basename(folderPath),
    created: birthtime && birthtime.toISOString(),
    modified: mtime && mtime.toISOString(),
  }
}
