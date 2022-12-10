import * as mockConnector from './mockConnector'
import folderConnector from './folderConnector'

export function createConnectors() {
  return {
    folder: process.env.NODE_ENV === 'development' ? mockConnector : folderConnector,
  }
}
