const { isEmpty } = require('../lib/utils')

exports.compareAndMergeDiographs = function compareAndMergeDiographs(
  existingDiograph,
  folderStructureDiograph
) {
  const newDiories = compareDiographs(existingDiograph, folderStructureDiograph)
  if (!isEmpty(newDiories)) {
    return addDioriesToDiograph(newDiories, existingDiograph)
  }

  return existingDiograph
}

function compareDiographs(existingDiograph, folderStructureDiograph) {
  let { diograph, rootId } = folderStructureDiograph
  const folderStructureDiographPathList = generatePathList(rootId, '/', diograph)

  ;({ diograph, rootId } = existingDiograph)
  const existingDiographPathList = generatePathList(rootId, '/', diograph)

  const paths2 = existingDiographPathList.map((p) => p.path)
  return folderStructureDiographPathList.filter(({ path }) => !paths2.includes(path))
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
  diograph.diograph = {
    ...diograph.diograph,
    ...diories.map((diory) => ({ [diory.diory.id]: diory.diory }))[0],
  }
  return diograph
}
