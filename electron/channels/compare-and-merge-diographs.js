const { isEmpty } = require('../lib/utils')

const MAXIMUM_SUBFOLDER_DEPTH = 15

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
function linkedDioriesWithPaths(diory, diograph, parentPath = '', recursionDepth = 0) {
  if (diory.links === {} || diory.links === undefined) {
    return []
  }

  // Circularly linked diories end up to an infinite recursion without this
  // eslint-disable-next-line no-cond-assign
  if ((recursionDepth += 1) > MAXIMUM_SUBFOLDER_DEPTH) {
    return []
  }

  return Object.entries(diory.links)
    .map(([path, { id }]) => {
      path = parentPath ? `${parentPath}/${path}` : path
      const dioryLinkedDioriesWithPaths = linkedDioriesWithPaths(
        diograph[id],
        diograph,
        path,
        recursionDepth
      )
      return [...dioryLinkedDioriesWithPaths, { path, diory: diograph[id] }]
    })
    .flat()
}

// Returns diograph with rootId
function addAndLinkDioriesToDiograph(linkedDioriesWithPaths, diograph) {
  // linkedDioriesWithPaths = [{ path: ..., diory: ... }, { path: ..., diory: ... }, ... ]

  // TODO: This adding diories to diograph could may be done already while linkedDioriesWithPaths
  diograph.diograph = {
    ...diograph.diograph,
    ...linkedDioriesWithPaths.reduce((obj, { diory }) => ({ ...obj, [diory.id]: diory }), {}),
  }

  // Sort linkedDioriesWithPaths by path
  // - prevent trying to link to diory that haven't been linked to anywhere itself yet
  linkedDioriesWithPaths.sort((a, b) => {
    if (a.path < b.path) {
      return -1
    }
    if (a.path > b.path) {
      return 1
    }
    return 0
  })

  // TODO: This linking could may be done already while linkedDioriesWithPaths
  // This may link diories multiple times (but shouldn't matter at all...)
  const rootDiory = diograph.diograph[diograph.rootId]
  linkedDioriesWithPaths.forEach((linkedDioryWithPath) => {
    // Iterate through the splitted path array and
    // Link diory to parent if no link created yet (!parentDioryLink)
    linkedDioryWithPath.path.split('/').reduce(
      ([parentDiory], pathSplit) => {
        let parentDioryLink
        parentDioryLink = diograph.diograph[parentDiory.id].links[pathSplit]
        if (!parentDioryLink) {
          diograph.diograph[parentDiory.id].links[pathSplit] = { id: linkedDioryWithPath.diory.id }
          parentDioryLink = diograph.diograph[parentDiory.id].links[pathSplit]
        }
        return [diograph.diograph[parentDioryLink.id], pathSplit]
      },
      [rootDiory, '']
    )
  })

  return diograph
}
