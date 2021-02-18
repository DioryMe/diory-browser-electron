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
  let { diograph, rootId } = folderStructureDiograph
  const newRootDiory = diograph[rootId]
  const newRootDioryPath = '/'
  const newRootDioryLinkedDiories = Object.entries(newRootDiory.links).map(([key, { id }]) => ({
    path: `${newRootDioryPath}${key}`,
    diory: diograph[id],
  }))

  diograph = existingDiograph.diograph
  rootId = existingDiograph.rootId
  // For some reason this didnt work:
  // ({ diograph, rootId } = existingDiograph)
  const existingRootDiory = diograph[rootId]
  const existingRootDioryPath = '/'
  const existingRootDioryLinkedDiories = Object.entries(
    existingRootDiory.links
  ).map(([key, { id }]) => ({ path: `${existingRootDioryPath}${key}`, diory: diograph[id] }))

  console.log(existingRootDioryLinkedDiories.map((jee) => jee.path))
  console.log(newRootDioryLinkedDiories.map((jee) => jee.path))

  return 'jee'
}

function addDioriesToDiograph(diories, diograph) {
  return diories
}
