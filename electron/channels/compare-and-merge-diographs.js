const { isEmpty } = require('../lib/utils')

exports.compareAndMergeDiographs = function compareAndMergeDiographs(
  existingDiograph,
  folderStructureDiograph
) {
  const newDiories = compareDiographs(existingDiograph, folderStructureDiograph)
  if (!isEmpty(newDiories)) {
    const mergedDiograph = addDioriesToDiograph(newDiories, existingDiograph)
    return mergedDiograph
  }
  return existingDiograph
}

function compareDiographs(existingDiograph, folderStructureDiograph) {
  return []
}

function addDioriesToDiograph(diories, diograph) {
  return diories
}
