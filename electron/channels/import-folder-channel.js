const { generateDiograph } = require('../generators/diograph-generator')
const { saveDiographJson } = require('../lib/save-diograph-json')
const { readDiographJson } = require('../lib/read-diograph-json')

exports.importFolderEventHandler = async function importFolderEventHandler(path) {
  // Read existing diograph.json
  const existingDiograph = readDiographJson(path)
  if (existingDiograph) {
    return existingDiograph
  }

  // Generate diograph if no diograph.json
  const diograph = await generateDiograph(path)
  await saveDiographJson(path, diograph.diograph, diograph.rootId)
  return diograph
}
