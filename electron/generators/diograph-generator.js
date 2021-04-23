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
  return subfolderDiographs.reduce(
    (obj, { diograph }) => ({
      ...obj,
      ...diograph,
    }),
    {}
  )
}

async function generateDioryLinksFromFiles(filePaths) {
  return Promise.all(
    filePaths.map((filePath) =>
      generateDioryFromFile(filePath).then((diory) => {
        const linkKey = basename(filePath)
        return generateDioryLink({ linkKey, diory })
      })
    )
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

exports.generateDiograph = async function generateDiograph(folderPath) {
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
    linkKey: basename(folderPath),
    rootId: rootDiory.id,
    diograph: {
      ...reduceDiorysToDiograph([rootDiory]),
      ...reduceDiorysToDiograph(Object.values(fileDioryLinks)),
      ...reduceSubfolderDiographsToDiograph(subfolderDiographs),
    },
  }
}
