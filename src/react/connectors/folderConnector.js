import * as mockConnector from './mockConnector'

export function createFolderConnector() {
  return process.env.NODE_ENV === 'development' ? mockConnector : window.folderConnector
}
