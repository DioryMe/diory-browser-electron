import { basename } from 'path'

export function generateFileLink(filePath = '', { id }) {
  const path = basename(filePath)
  return {
    [path]: { id }
  }
}

export function generateFolderLink(filePath = '', { id }) {
  const path = basename(filePath)
  return {
    [path]: { id }
  }
}
