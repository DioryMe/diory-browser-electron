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

  // Relative paths for image & contentUrl
  // TODO: Move to own function, how to make immutable?
  Object.keys(diograph.diograph).forEach((dioryId) => {
    const diory = diograph.diograph[dioryId]
    if (diory.image) {
      diory.image = diory.image.replace(`${path}/`, '')
    }
    if (diory.data && diory.data.contentUrl) {
      diory.data.contentUrl = diory.data.contentUrl.replace(`${path}/`, '')
    }
  })

  await saveDiographJson(path, diograph.diograph, diograph.rootId)
  return { ...diograph, path }
}
