import fileUrl from 'file-url'
import { useConvertRelativePath } from './useConvertRelativePath'
import { useStore } from '../store'

export const useGetImageUrl = (imageUrl) => {
  const [{ connections }] = useStore((state) => state.connectors)
  const absoluteImageUrl = useConvertRelativePath(imageUrl.toString(), connections)

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
