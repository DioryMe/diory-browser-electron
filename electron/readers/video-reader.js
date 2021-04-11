const { basename } = require('path')
const FileType = require('file-type')

async function generateSchema(videoPath) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    contentUrl: videoPath,
    encodingFormat: (await FileType.fromFile(videoPath)).mime,
  }
}

exports.readVideo = async function readVideo(videoPath) {
  if (!videoPath) {
    return
  }

  try {
    return {
      text: basename(videoPath),
      // TODO: Remove video attribute as now we have diory.data.contentUrl
      video: videoPath,
      data: {
        ...(await generateSchema(videoPath)),
      },
    }
  } catch (error) {
    console.info(`Error reading video ${videoPath}: ${error}`)
  }
}
