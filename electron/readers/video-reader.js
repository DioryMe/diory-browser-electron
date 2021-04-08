const { basename } = require('path')
const { pathToFileURL } = require('url')

function generateSchema(videoPath) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    contentUrl: pathToFileURL(videoPath).toString(),
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
      video: pathToFileURL(videoPath).toString(),
      data: {
        ...generateSchema(videoPath),
      },
    }
  } catch (error) {
    console.info(`Error reading video ${videoPath}: ${error}`)
  }
}
