export { debounce } from './debounce'
export { convertToFileUrl } from './convertToFileUrl'

// export const getContentUrlFromCID = async (relativePath, encodingFormat) =>
//   `http://localhost:3000/room-2/content?cid=${relativePath}&mime=${encodingFormat}`

export const getContentUrlFromCID = async (cid, encodingFormat) => {
  const loadedRoom = await window.diographJsAdapter.getLoadedRoom()
  const content = await loadedRoom.readContent(cid)
  const url = URL.createObjectURL(new Blob([content], { type: encodingFormat }))
  console.log('Created URL: ', url)
  return url
}

export const revokeContentUrl = (url) => {
  URL.revokeObjectURL(url)
  console.log('Revoked URL:', url)
}
