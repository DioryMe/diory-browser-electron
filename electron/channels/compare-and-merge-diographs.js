const { isEmpty } = require('../lib/utils')

// Returns diograph with rootId
exports.compareAndMergeDiographs = function compareAndMergeDiographs(
  existingDiograph,
  folderStructureDiograph
) {
  const newDiories = compareDiographs(existingDiograph, folderStructureDiograph)
  if (!isEmpty(newDiories)) {
    return addAndLinkDioriesToDiograph(newDiories, existingDiograph)
  }
  return existingDiograph
}

// Returns [{ path: ..., diory: ... }, { path: ..., diory: ... }, ... ]
function compareDiographs(existingDiograph, folderStructureDiograph) {
  let { diograph, rootId } = folderStructureDiograph
  const folderStructureDiographPathList = generatePathList(rootId, diograph)

  ;({ diograph, rootId } = existingDiograph)
  const existingDiographPathList = generatePathList(rootId, diograph)

  const paths2 = existingDiographPathList.map((p) => p.path)
  return folderStructureDiographPathList.filter(({ path }) => !paths2.includes(path))
}

// Returns [{ path: ..., diory: ... }, { path: ..., diory: ... }, ... ]
function generatePathList(rootId, diograph) {
  const rootDiory = diograph[rootId]
  const linkedDioryPaths = Object.entries(rootDiory.links).map(([key, { id }]) => ({
    path: `/${key}`,
    diory: diograph[id],
  }))
  //
  // -- joku rekursio tähän, jossa käydään linkedDioryt läpi ---
  //
  // Lisätään myös rootDiory
  linkedDioryPaths.push({ path: '/', diory: rootDiory })
  return linkedDioryPaths
}

// Returns diograph with rootId
function addAndLinkDioriesToDiograph(diories, diograph) {
  // diories = [{ path: ..., diory: ... }, { path: ..., diory: ... }, ... ]
  diograph.diograph = {
    ...diograph.diograph,
    ...diories.reduce((obj, { diory }) => ({ ...obj, [diory.id]: diory }), {}),
  }

  // Linking:
  // => /Tampere                        diograph[rootId]
  // => /Tampere/frenkell.jpg           diograph[diograph[rootId].id].links['Tampere'].id]
  // => /Tampere/Frenkell/frenkell.jpg  diograph[diograph[diograph[rootId].id].links['Tampere'].id].links['Frenkell'].id

  // TODO: Make this recursive^, currently works only on root level
  const { rootId } = diograph
  diories.forEach((diory) => {
    diograph.diograph[rootId].links[diory.path] = { id: diory.diory.id }
  })

  return diograph
}
