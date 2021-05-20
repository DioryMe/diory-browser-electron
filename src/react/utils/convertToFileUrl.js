import fileUrl from 'file-url'

export const convertToFileUrl = (imageUrl) => {
  // Base64 images
  if (RegExp('^data:').exec(imageUrl)) {
    return imageUrl
  }

  // Images from internet
  if (RegExp('^http(s)?://').exec(imageUrl)) {
    return imageUrl
  }

  // Convert to file:// url
  return imageUrl && fileUrl(imageUrl)
}
