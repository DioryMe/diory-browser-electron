import fileUrl from 'file-url'

export const getImageUrl = (imageUrl) => {
  // Images from internet
  if (/^http(s)?:\/\//.exec(imageUrl)) {
    return imageUrl
  }

  // Development content
  if (/^development-content-room/.exec(imageUrl)) {
    return `http://localhost:3300/${imageUrl}`
  }

  // Convert absolute path to file:// url
  return imageUrl && fileUrl(imageUrl.toString())
}
