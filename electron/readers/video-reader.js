const { basename } = require('path')
const exiftool = require('node-exiftool')
const exiftoolBin = require('dist-exiftool')

const exifToolProcess = new exiftool.ExiftoolProcess(exiftoolBin)

async function readExifTags(videoPath) {
  await exifToolProcess.open()
  const videoRawMetadata = await exifToolProcess.readMetadata(videoPath, ['-File:all'])
  // FIXME: Sometimes this closes process too early (there should be common process...)
  // await exifToolProcess.close()
  return videoRawMetadata.data[0]
}

function getDateTime(dateTime) {
  if (!dateTime) {
    return
  }
  const [date, time] = dateTime.split(' ')
  const [year, month, day] = date.split(':')
  const [hour, min, sec] = time.split(':')
  return `${[year, month, day].join('-')}T${[hour, min, sec].join(':')}.000Z`
}

function getDate({ DateTime, DateTimeOriginal, CreateDate }) {
  const date = getDateTime(DateTime) || getDateTime(DateTimeOriginal) || getDateTime(CreateDate)
  return date && { date }
}

// Same as getDate
function getCreated({ DateTime, DateTimeOriginal, CreateDate }) {
  const created = getDateTime(DateTime) || getDateTime(DateTimeOriginal) || getDateTime(CreateDate)
  return created && { created }
}

function getLatitude({ GPSLatitude = {} }) {
  const latitude = GPSLatitude
  return latitude && { latitude }
}

function getLongitude({ GPSLongitude = {} }) {
  const longitude = GPSLongitude
  return longitude && { longitude }
}

exports.readVideo = function readVideo(videoPath) {
  if (!videoPath) {
    return
  }

  try {
    const tags = readExifTags(videoPath)
    return {
      text: basename(videoPath),
      video: videoPath,
      ...getDate(tags),
      ...getLatitude(tags),
      ...getLongitude(tags),
      ...getCreated(tags),
    }
  } catch (error) {
    console.info(`Error reading video ${videoPath}: ${error}`)
  }
}
