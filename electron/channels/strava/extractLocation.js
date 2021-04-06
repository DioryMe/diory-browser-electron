const fs = require('fs')
const { unzipSync } = require('zlib')
const { extname } = require('path')
const { DOMParser } = require('xmldom')
const { SportsLib } = require('@sports-alliance/sports-lib')

async function parseGpx(fileName) {
  const gpxString = fs.readFileSync(fileName).toString()
  return SportsLib.importFromGPX(gpxString, DOMParser)
}

async function parseTcx(fileName) {
  const zippedBuffer = fs.readFileSync(fileName)
  const tcxString = unzipSync(zippedBuffer).toString('utf8')
  return SportsLib.importFromTCX(new DOMParser().parseFromString(tcxString, 'application/xml'))
}

async function parseFit(fileName) {
  const fitBuffer = fs.readFileSync(fileName, null)
  return SportsLib.importFromFit(fitBuffer)
}

async function getGpsData(fileName) {
  fileName
  const extension = extname(fileName)
  switch (extension) {
    case '.gpx':
      return parseGpx(fileName)
    case '.gz':
      return parseTcx(fileName)
    case '.fit':
      return parseFit(fileName)
    default:
      return null
  }
}

function getStartPosition(stats) {
  const { latitudeDegrees, longitudeDegrees } = stats.get('Start Position').getValue()
  return {
    latitude: latitudeDegrees,
    longitude: longitudeDegrees,
  }
}

exports.extractLocation = async function extractLocation(fileName) {
  try {
    const gpsData = await getGpsData(fileName)
    if (!gpsData) {
      return null
    }
    const stats = gpsData.getStats()
    if (!stats) {
      return null
    }

    return getStartPosition(stats)
  } catch (e) {
    console.log(e)
    return null
  }
}
