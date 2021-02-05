const { isEmpty, promiseAllReduce } = require('../lib/utils')
const { readPaths } = require('../readers/folder-reader')
const { generateFileDiory, generateFolderDiory } = require('./diory-generator')
const { generateFileLink, generateFolderLink } = require('./link-generator')

function getDiorys(diograph, links) {
  return Object.values(links).map(({ id }) => diograph[id])
}

function addToDiograph(diory) {
  return (
    diory.id && {
      [diory.id]: diory,
    }
  )
}

async function generateFileDiographAndLink(filePath) {
  const fileDiory = generateFileDiory(filePath)

  const fileDiograph = addToDiograph(fileDiory)
  const fileLink = generateFileLink(filePath, fileDiory)

  return [fileDiograph, fileLink]
}

async function generateFolderDiographAndLink(folderPath) {
  const { id, diograph } = await generateDiograph(folderPath) // eslint-disable-line  no-use-before-define

  const folderDiory = diograph[id]
  const folderLink = generateFolderLink(folderPath, folderDiory)

  return [diograph, folderLink]
}

/**
 * Generates diograph object by reading the folder structure (path given as an argument)
 * @param {string} folderPath
 * @returns {object} Object with (=room diory) id and diograph
 *
 * @example
 * {
 *   id: '123-abc-def',
 *   diograph: {
 *     'abc-def-123': { ... },
 *     'ghi-jkl-456': { ... },
 *     ...
 *   }
 * }
 */
async function generateDiograph(folderPath) {
  const { files = [], subfolders = [] } = (await readPaths(folderPath)) || {}

  const [filesDiograph, fileLinks] = await promiseAllReduce(files.map(generateFileDiographAndLink))

  const [foldersDiograph, folderLinks] = await promiseAllReduce(
    subfolders.map(generateFolderDiographAndLink)
  )

  const diograph = {
    ...filesDiograph,
    ...foldersDiograph,
  }

  const links = {
    ...folderLinks,
    ...fileLinks,
  }

  const linkedDiorys = getDiorys(diograph, links)
  const diory = {
    ...generateFolderDiory(folderPath, linkedDiorys),
    ...(!isEmpty(links) && { links }),
  }

  return {
    rootId: diory.id,
    diograph: {
      ...diograph,
      ...addToDiograph(diory),
    },
  }
}

exports.generateDiograph = generateDiograph
