const { basename } = require('path')
const { getFileAndSubfolderPaths } = require('../readers/folder-reader')
const { generateDioryFromFile, generateDioryFromFolder } = require('./diory-generator')

function generateDioryLink({ linkKey, diory }) {
  return {
    [linkKey]: diory,
  }
}

function reduceDiorysToDiograph(diorys) {
  return diorys.reduce(
    (obj, diory) => ({
      ...obj,
      ...(diory && diory.id ? { [diory.id]: diory } : {}),
    }),
    {}
  )
}

function reduceSubfolderDiographsToDiograph(subfolderDiographs) {
  const diograph = subfolderDiographs.reduce(
    (obj, subfolderDiograph) => ({
      ...obj,
      ...subfolderDiograph.diograph,
    }),
    {}
  )

  // diory.links have only ids instead of the whole diory
  Object.keys(diograph).forEach((key) => {
    const diory = diograph[key]
    if (diory && diory.links) {
      Object.keys(diory.links).forEach((key) => {
        diory.links[key] = { id: diory.links[key].id }
      })
    }
  })

  return diograph
}

async function generateDioryLinksFromFiles(filePaths) {
  return Promise.all(
    filePaths.map((filePath) => {
      const diory = generateDioryFromFile(filePath)
      const linkKey = basename(filePath)
      return generateDioryLink({ linkKey, diory })
    })
  ).then((fileDiographs) =>
    fileDiographs.reduce(
      (obj, dioryLink) => ({
        ...obj,
        ...dioryLink,
      }),
      {}
    )
  )
}

function reduceSubfolderDiographsToDioryLinks(subfolderDiographs) {
  return subfolderDiographs
    .map(({ linkKey, rootId, diograph }) => {
      const diory = diograph[rootId]
      return generateDioryLink({ linkKey, diory })
    })
    .reduce(
      (obj, dioryLink) => ({
        ...obj,
        ...dioryLink,
      }),
      {}
    )
}

/**
 * Generates diograph object by reading the folder structure (path given as an argument)
 * @param {string} folderPath
 * @returns {object} Object with rootId and diograph
 *
 * @example
 * {
 *   rootId: '123-abc-def',
 *   linkKey: 'some-folder',
 *   diograph: {
 *     'abc-def-123': { ... },
 *     'ghi-jkl-456': { ... },
 *     ...
 *   }
 * }
 */
async function generateFolderDiograph(folderPath) {
  const { filePaths = [], subfolderPaths = [] } = (await getFileAndSubfolderPaths(folderPath)) || {}

  const fileDioryLinks = await generateDioryLinksFromFiles(filePaths)

  const subfolderDiographs = await Promise.all(subfolderPaths.map(generateFolderDiograph))

  const subfolderDioryLinks = reduceSubfolderDiographsToDioryLinks(subfolderDiographs)

  const dioryLinks = {
    ...fileDioryLinks,
    ...subfolderDioryLinks,
  }

  const rootDiory = generateDioryFromFolder(folderPath, dioryLinks)

  return {
    linkKey: basename(folderPath || 'some-path'),
    rootId: rootDiory && rootDiory.id,
    diograph: {
      ...reduceDiorysToDiograph([rootDiory]),
      ...reduceDiorysToDiograph(Object.values(fileDioryLinks)),
      ...reduceSubfolderDiographsToDiograph(subfolderDiographs),
    },
  }
}

// One more round of reduceSubfolderDiographsToDiograph for the diograph folder diograph
// - remove unnecessary linkKey, rootId and replace linkDiories with linkIds
exports.generateDiograph = async function (folderPath) {
  const diograph = await generateFolderDiograph(folderPath)
  const cleanedUpDiograph = reduceSubfolderDiographsToDiograph([diograph])
  return {
    linkKey: diograph.linkKey,
    rootId: diograph.rootId,
    diograph: cleanedUpDiograph,
  }
}
