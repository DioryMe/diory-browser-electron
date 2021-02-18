const { isEmpty } = require('../lib/utils')

// Returns diograph with rootId
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

// Returns [{ path: ..., diory: ... }, { path: ..., diory: ... }, ... ]
function compareDiographs(existingDiograph, folderStructureDiograph) {
  let { diograph, rootId } = folderStructureDiograph
  const folderStructureDiographPathList = generatePathList(rootId, '/', diograph)

  ;({ diograph, rootId } = existingDiograph)
  const existingDiographPathList = generatePathList(rootId, '/', diograph)

  const paths2 = existingDiographPathList.map((p) => p.path)
  return folderStructureDiographPathList.filter(({ path }) => !paths2.includes(path))
}

// Returns [{ path: ..., diory: ... }, { path: ..., diory: ... }, ... ]
function generatePathList(rootId, path, diograph) {
  const rootDiory = diograph[rootId]
  const linkedDioryPaths = Object.entries(rootDiory.links).map(([key, { id }]) => ({
    path: `${path}${key}`,
    diory: diograph[id],
  }))
  linkedDioryPaths.push({ path: '/', diory: rootDiory })
  return linkedDioryPaths
}

// Returns diograph with rootId
function addDioriesToDiograph(diories, diograph) {
  // diories = [{ path: ..., diory: ... }, { path: ..., diory: ... }, ... ]
  diograph.diograph = {
    ...diograph.diograph,
    ...diories.reduce((obj, { diory }) => ({ ...obj, [diory.id]: diory }), {}),
  }
  return diograph
}
