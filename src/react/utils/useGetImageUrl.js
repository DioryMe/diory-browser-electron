import fileUrl from 'file-url'
import { convertRelativePath } from './convertRelativePath'
import { useStore } from '../store'

export const useGetImageUrl = (imageUrl) => {
  const [{ connections }] = useStore((state) => state.connectors)
  const absoluteImageUrl = convertRelativePath(imageUrl.toString(), connections)

  // Images from internet
  if (/^http(s)?:\/\//.exec(imageUrl)) {
    return imageUrl
  }

  // Development content
  if (/^development-content-room/.exec(imageUrl)) {
    return `http://localhost:3300/${imageUrl}`
  }

  // Convert to file:// url
  return absoluteImageUrl && fileUrl(absoluteImageUrl)
}
