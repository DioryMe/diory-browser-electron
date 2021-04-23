const { generateDiograph } = require('../generators/diograph-generator')
const { saveDiographJson } = require('../lib/save-diograph-json')
const { readDiographJson } = require('../lib/read-diograph-json')
const { compareAndMergeDiographs } = require('./compare-and-merge-diographs')

exports.generateDiographEventHandler = async function generateDiographEventHandler(event, path) {
  const existingDiograph = readDiographJson(path)
  const folderStructureDiograph = await generateDiograph(path)
  const diograph = existingDiograph
    ? compareAndMergeDiographs(existingDiograph, folderStructureDiograph)
    : folderStructureDiograph
  await saveDiographJson(path, diograph.diograph, diograph.rootId)
  return { ...diograph, path }
}
