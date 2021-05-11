import fileUrl from 'file-url'

export const convertToFileUrl = (imageUrl) => {
  // Images from internet
  if (RegExp('^http(s)?://').exec(imageUrl)) {
    return imageUrl
  }

  // Convert to file:// url
  return imageUrl && fileUrl(imageUrl)
}
