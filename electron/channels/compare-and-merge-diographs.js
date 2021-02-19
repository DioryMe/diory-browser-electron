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
  const folderStructureDiographPathList = linkedDioriesWithPaths(diograph[rootId], diograph)

  ;({ diograph, rootId } = existingDiograph)
  const existingDiographPathList = linkedDioriesWithPaths(diograph[rootId], diograph)

  const paths2 = existingDiographPathList.map((p) => p.path)
  return folderStructureDiographPathList.filter(({ path }) => !paths2.includes(path))
}

// Returns [{ path: ..., diory: ... }, { path: ..., diory: ... }, ... ]
function linkedDioriesWithPaths(diory, diograph, parentPath = '') {
  if (diory.links === {} || diory.links === undefined) {
    return []
  }

  return Object.entries(diory.links)
    .map(([path, { id }]) => {
      path = parentPath ? `${parentPath}/${path}` : path
      const dioryLinkedDioriesWithPaths = linkedDioriesWithPaths(diograph[id], diograph, path)
      return [...dioryLinkedDioriesWithPaths, { path, diory: diograph[id] }]
    })
    .flat()
}

// Returns diograph with rootId
function addAndLinkDioriesToDiograph(linkedDioriesWithPaths, diograph) {
  // diories = [{ path: ..., diory: ... }, { path: ..., diory: ... }, ... ]
  diograph.diograph = {
    ...diograph.diograph,
    ...linkedDioriesWithPaths.reduce((obj, { diory }) => ({ ...obj, [diory.id]: diory }), {}),
  }

  // Linking:
  // => /Tampere                        diograph[rootId]
  // => /Tampere/frenkell.jpg           diograph[diograph[rootId].id].links['Tampere'].id]
  // => /Tampere/Frenkell/frenkell.jpg  diograph[diograph[diograph[rootId].id].links['Tampere'].id].links['Frenkell'].id

  // TODO: Make this recursive^, currently works only on root level

  const rootDiory = diograph.diograph[diograph.rootId]

  // Sort by path (to avoid linking to diory that haven't been linked itself yet)
  linkedDioriesWithPaths.sort((a, b) => {
    if (a.path < b.path) {
      return -1
    }
    if (a.path > b.path) {
      return 1
    }
    return 0
  })
  // console.log(linkedDioriesWithPaths)

  // This links diories multiple times (but shouldn't matter at all...)
  linkedDioriesWithPaths.forEach((linkedDioryWithPath) => {
    console.log(linkedDioryWithPath.path)
    // Haetaan viimeinen pathSplit ja sen parent eli edellinen diory
    linkedDioryWithPath.path.split('/').reduce(
      ([parentDiory], pathSplit) => {
        let parentDioryLink
        console.log(parentDiory)
        parentDioryLink = diograph.diograph[parentDiory.id].links[pathSplit]
        if (!parentDioryLink) {
          diograph.diograph[parentDiory.id].links[pathSplit] = { id: linkedDioryWithPath.diory.id }
          parentDioryLink = diograph.diograph[parentDiory.id].links[pathSplit]
        }
        return [diograph.diograph[parentDioryLink.id], pathSplit]
      },
      [rootDiory, '']
    )

    // console.log(dioryToBeLinked)
    // console.log(pathSplit)
    // ;(dioryToBeLinked || rootDiory).links[pathSplit] = {
    //   id: linkedDioryWithPath.diory.id,
    // }

    // function linkToParent(parentDiory, dioryId, path) {
    //   parentDiory.links[path] = { id: dioryId }
    // }
    // linkToParent()
    // console.log(diory.path)
    // diograph.diograph[rootId].links[diory.path] = { id: diory.diory.id }
  })

  return diograph
}
