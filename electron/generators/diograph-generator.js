const { basename } = require('path')
const { getFileAndSubfolderPaths } = require('../readers/folder-reader')
const { generateDioryFromFile, generateDioryFromFolder } = require('./diory-generator')

function generateDioryLink({ key, diory }) {
  return {
    [key]: diory,
  }
}

function reduceDiorysToDiograph(diorys) {
  return diorys.reduce(
    (obj, diory) => ({
      ...obj,
      [diory.id]: diory,
    }),
    {}
  )
}

function reduceSubfolderDiographsToDiograph(diographs) {
  return diographs.reduce(
    (obj, diograph) => ({
      ...obj,
      ...diograph,
    }),
    {}
  )
}

async function generateDioryLinksFromFiles(filePaths) {
  return Promise.all(
    filePaths.map((filePath) => {
      const diory = generateDioryFromFile(filePath)
      const key = basename(filePath)
      return generateDioryLink({ key, diory })
    })
  ).reduce(
    (obj, dioryLink) => ({
      ...obj,
      ...dioryLink,
    }),
    {}
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
 *   diograph: {
 *     'abc-def-123': { ... },
 *     'ghi-jkl-456': { ... },
 *     ...
 *   }
 * }
 */
async function generateDiograph(folderPath) {
  const { filePaths = [], subfolderPaths = [] } = (await getFileAndSubfolderPaths(folderPath)) || {}

  const fileDioryLinks = await generateDioryLinksFromFiles(filePaths)

  const subfolderDiographs = await Promise.all(subfolderPaths.map(generateDiograph))

  const subfolderDioryLinks = reduceSubfolderDiographsToDioryLinks(subfolderDiographs)

  const dioryLinks = {
    ...fileDioryLinks,
    ...subfolderDioryLinks,
  }

  const rootDiory = generateDioryFromFolder(folderPath, dioryLinks)

  return {
    key: basename(folderPath),
    rootId: rootDiory.id,
    diograph: {
      ...reduceDiorysToDiograph([rootDiory]),
      ...reduceDiorysToDiograph(Object.values(fileDioryLinks)),
      ...reduceSubfolderDiographsToDiograph(subfolderDiographs),
    },
  }
}

exports.generateDiograph = generateDiograph
