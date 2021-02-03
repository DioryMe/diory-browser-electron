const { isEmpty, promiseAllReduce } = require('../lib/utils')
const { getFileAndSubfolderPaths } = require('../readers/folder-reader')
const { generateDioryFromFile, generateDioryFromFolder } = require('./diory-generator')
const { generateLink } = require('./link-generator')
const { basename } = require('path')

function generateDioryLink({ linkKey, diory }) {
  return {
    [linkKey]: diory,
  }
}

async function generateDioryLinksFromFiles(filePaths) {
  return Promise.all(filePaths.map((filePath) => {
    const diory = generateDioryFromFile(filePath)
    const linkKey = basename(filePath)
    return generateDioryLink({ linkKey, diory })
  }))
    .reduce((obj, dioryLink) => ({
      ...obj,
      ...dioryLink,
    }), {})
}

function reducerSubfolderDiographsToDioryLinks(subfolderDiographs) {
  return subfolderDiographs
    .map(({ linkKey, rootId, diograph }) => {
      const diory = diograph[rootId]
      return generateDioryLink({ linkKey, diory })
    })
    .reduce((obj, dioryLink) => ({
      ...obj,
      ...dioryLink,
    }), {})
}

async function generateDiograph(folderPath) {
  const { filePaths = [], subfolderPaths = [] } = (await getFileAndSubfolderPaths(folderPath)) || {}

  const fileDioryLinks = await generateDioryLinksFromFiles(filePaths)

  const subfolderDiographs = await Promise.all(subfolderPaths.map(generateDiograph))
  const subfolderDioryLinks = reducerSubfolderDiographsToDioryLinks(subfolderDiographs)

  const dioryLinks = {
    ...fileDioryLinks,
    ...subfolderDioryLinks,
  }

  const rootDiory = generateDioryFromFolder(folderPath, dioryLinks)

  return {
    linkKey: basename(folderPath),
    rootId: rootDiory.id,
    diograph: {
      ...reduceDiorysToDiograph([rootDiory]),
      ...reduceDiorysToDiograph(Object.values(fileDioryLinks)),
      ...reduceSubfolderDiographsToDiograph(subfolderDiographs),
    },
  }
}

exports.generateDiograph = generateDiograph
