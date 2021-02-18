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
  const folderStructureDiographPathList = generatePathList(rootId, '/', diograph)

  ;({ diograph, rootId } = existingDiograph)
  const existingDiographPathList = generatePathList(rootId, '/', diograph)

  const paths1 = folderStructureDiographPathList.map((p) => p.path)
  const paths2 = existingDiographPathList.map((p) => p.path)
  console.log(paths1)
  console.log(paths2)
  return 'jee' // paths1.filter(path => !paths2.includes(path))
}

function generatePathList(rootId, path, diograph) {
  const rootDiory = diograph[rootId]
  const linkedDioryPaths = Object.entries(rootDiory.links).map(([key, { id }]) => ({
    path: `${path}${key}`,
    diory: diograph[id],
  }))
  linkedDioryPaths.push({ path: '/', diory: rootDiory })
  return linkedDioryPaths
}

function addDioriesToDiograph(diories, diograph) {
  return diories
}
