export { debounce } from './debounce'
export { convertToFileUrl } from './convertToFileUrl'

export const getContentUrlFromCID = (relativePath, encodingFormat) =>
  `http://localhost:3000/room-2/content?cid=${relativePath}&mime=${encodingFormat}`
