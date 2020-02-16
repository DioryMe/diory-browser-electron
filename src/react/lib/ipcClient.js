import { fetchFile } from './fileClient'

const { ipcRenderer } = window

export const fetchData = (channel, data) => {
  if (!ipcRenderer) {
    return fetchFile(channel, data)
  }

  return new Promise((resolve, reject) => {
}
