const { isEmpty, promiseAllReduce } = require('../lib/utils')
const { getFileAndSubfolderPaths } = require('../readers/folder-reader')
const { generateDioryFromFile, generateDioryFromFolder } = require('./diory-generator')
const { generateLink } = require('./link-generator')
const { basename } = require('path')

function generateDioryLink({ key, diory }) {
  return {
    [key]: diory,
  }
}

function reduceDiorysToDiograph(diorys) {
  return diorys.reduce((obj, diory) => ({
    ...obj,
    [diory.id]: diory,
  }), {})
}

function reduceSubfolderDiographsToDiograph(diographs) {
  return diographs.reduce((obj, diograph) => ({
    ...obj,
    ...diograph,
  }), {})
}

async function generateDioryLinksFromFiles(filePaths) {
  return Promise.all(filePaths.map((filePath) => {
    const diory = generateDioryFromFile(filePath)
    const key = basename(filePath)
    return generateDioryLink({ key, diory })
  }))
    .reduce((obj, dioryLink) => ({
      ...obj,
      ...dioryLink,
    }), {})

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

  const fileDioryLinks = await Promise.all(filePaths.map((filePath) => {

  const subfolderDiographs = await Promise.all(subfolderPaths.map(generateDiograph))

  const subfolderDioryLinks = subfolderDiographs
    .map(({ key, id, diograph }) => {
      const diory = diograph[id]
      return generateDioryLink({ key, diory })
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
