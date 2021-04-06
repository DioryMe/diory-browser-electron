const { readCsvFileToJson } = require('./readCsvFileToJson')
const { generateDiorys } = require('./generateDiorys')
const { reduceToDiograph } = require('./reduceToDiograph')

exports.stravaChannel = async function stravaChannel(event, { filePath }) {
  const activities = await readCsvFileToJson(filePath)
  const diorys = await generateDiorys(activities)
  return { diorys }
}
