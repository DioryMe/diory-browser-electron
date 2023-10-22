import * as mockConnector from './mock/mockConnector'

export function createFolderConnector() {
  return process.env.NODE_ENV === 'test' ? mockConnector : window.folderConnector
}
