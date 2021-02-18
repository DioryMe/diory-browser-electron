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
  const { diograph, rootId } = folderStructureDiograph
  const newRootDiory = diograph[rootId]
  const newRootDioryPath = '/'
  const newRootDioryLinkedDiories = Object.entries(newRootDiory.links).map(([key, { id }]) => {
    console.log({ path: `${newRootDioryPath}${key}`, diory: diograph[id] })
    return { path: `${newRootDioryPath}${key}`, diory: diograph[id] }
  })
  return newRootDioryLinkedDiories

  // const existingRootDiory = diograph[rootId]
  // const newRootDioryPath = '/'
  // const newRootDioryLinkedDiories = Object.entries(newRootDiory.links).map(([key, { id }]) => {
  //   console.log({ path: `${newRootDioryPath}${key}`, diory: diograph[id] })
  //   return { path: `${newRootDioryPath}${key}`, diory: diograph[id] }
  // })
}

function addDioriesToDiograph(diories, diograph) {
  return diories
}
