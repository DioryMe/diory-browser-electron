const { basename } = require('path')

function generateSchema(videoPath) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    contentUrl: videoPath,
  }
}

exports.readVideo = function readVideo(videoPath) {
  if (!videoPath) {
    return
  }

  try {
    return {
      text: basename(videoPath),
      // TODO: Remove video attribute as now we have diory.data.contentUrl
      video: videoPath,
      data: {
        ...generateSchema(videoPath),
      },
    }
  } catch (error) {
    console.info(`Error reading video ${videoPath}: ${error}`)
  }
}
