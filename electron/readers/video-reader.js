const { basename } = require('path')

exports.readVideo = function readVideo(videoPath) {
  if (!videoPath) {
    return
  }

  try {
    return {
      text: basename(videoPath),
      video: videoPath,
      // ...getDate(tags),
      // ...getLatitude(tags),
      // ...getLongitude(tags),
      // ...getCreated(tags),
    }
  } catch (error) {
    console.info(`Error reading video ${videoPath}: ${error}`)
  }
}
