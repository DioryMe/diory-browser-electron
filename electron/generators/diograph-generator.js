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

async function generateDiograph(folderPath) {
  const { filePaths = [], subfolderPaths = [] } = (await getFileAndSubfolderPaths(folderPath)) || {}

  const fileDioryLinks = await Promise.all(filePaths.map((filePath) => {
    const diory = generateDioryFromFile(filePath)
    const linkKey = basename(filePath)
    return generateDioryLink({ linkKey, diory })
  }))
    .reduce((obj, dioryLink) => ({
      ...obj,
      ...dioryLink,
    }), {})

  const subfolderDiographs = await Promise.all(subfolderPaths.map(generateDiograph))

  const subfolderDioryLinks = subfolderDiographs
    .map(({ linkKey, id, diograph }) => {
      const diory = diograph[id]
      return generateDioryLink({ linkKey, diory })
    })
    .reduce((obj, dioryLink) => ({
      ...obj,
      ...dioryLink,
    }), {})

  const dioryLinks = {
    ...fileDioryLinks,
    ...subfolderDioryLinks,
  }

  const rootDiory = generateDioryFromFolder(folderPath, dioryLinks)

  return {
    linkKey: basename(folderPath),
    id: rootDiory.id,
    diograph: {
      ...reduceDiorysToDiograph([rootDiory]),
      ...reduceDiorysToDiograph(Object.values(fileDioryLinks)),
      ...reduceSubfolderDiographsToDiograph(subfolderDiographs),
    },
  }
}

exports.generateDiograph = generateDiograph
