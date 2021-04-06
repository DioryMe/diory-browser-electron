const { dirname } = require('path')
const csvtojson = require('csvtojson')

function addFolderPathToFilename(folderPath) {
  return ({ Filename, ...activity }) => ({
    ...activity,
    Filename: `${folderPath}/${Filename}`,
  })
}
exports.readCsvFileToJson = async function readCsvFileToJson(filePath) {
  const activities = await csvtojson().fromFile(filePath)
  return activities.map(addFolderPathToFilename(dirname(filePath)))
}
