import { resolve } from 'path'

export function isFile(dirent) {
  return dirent.isFile()
}

export function isFolder(dirent) {
  return dirent.isDirectory()
}

export function getPath(folderPath) {
  return (dirent) => resolve(folderPath, dirent.name)
}
