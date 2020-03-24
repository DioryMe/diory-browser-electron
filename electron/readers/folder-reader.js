import { existsSync, lstatSync, promises, statSync } from 'fs'
import { basename } from 'path'
import { isFile, isFolder, getPath } from './dirent-reader'

export async function readPaths(folderPath) {
  if (!(existsSync(folderPath) && lstatSync(folderPath).isDirectory())) {
    throw new Error(`Path is not folder ${folderPath}`)
  }
  const dirents = await promises.readdir(folderPath, { withFileTypes: true });
  return {
    files: dirents.filter(isFile).map(getPath(folderPath)),
    subfolders: dirents.filter(isFolder).map(getPath(folderPath)),
  }
}

export function readFolder(folderPath = '') {
  const folderStats = statSync(folderPath) || {}
  return {
    name: basename(folderPath),
    created: folderStats.ctime,
    modified: folderStats.mtime,
  }
}
