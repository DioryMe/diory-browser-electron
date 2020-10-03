// 1. Testaa video jutulla
//

const glob = require('glob')
const exiftool = require('node-exiftool')
const exiftoolBin = require('dist-exiftool')
const exifToolProcess = new exiftool.ExiftoolProcess(exiftoolBin)

const jeejee = async (videoPath) => {
  const pid = await exifToolProcess.open()
  console.log('Started exiftool process %s', pid)
  const videoRawMetadata = await exifToolProcess.readMetadata(videoPath, ['-File:all'])
  // await exifToolProcess.close()
  console.log('Closed exiftool process %s', pid)

  return videoRawMetadata['data'][0]
}

glob('*.{AVI,mp4,jpg}', (err, files) => {
  if (err) {
    console.log(err)
  }
  return files.forEach((videoPath) => {
    jeejee(videoPath).then((tags) => {
      console.log(tags)
      console.log(videoPath)
      console.log(getDate(tags))
      console.log(getLatitude(tags))
      console.log(getLongitude(tags))
    })
  })
})

// [
//   '2020-08-30 10.48.32.mp4',
//   'Lumia Jouni_20131017_115537Z.mp4',
//   'MVI_3031.AVI'
// ].forEach(videoPath => {
//   jeejee(videoPath).then((tags) => {
//     console.log(videoPath)
//     // console.log(tags)
//     console.log(getDate(tags))
//     console.log(getLatitude(tags))
//     console.log(getLongitude(tags))
//   })
// })



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

function getLatitude({ GPSLatitude = {} }) {
  const latitude = GPSLatitude
  return latitude && { latitude }
}

function getLongitude({ GPSLongitude = {} }) {
  const longitude = GPSLongitude
  return longitude && { longitude }
}


