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
  const diory = generateFileDiory(filePath)

  const diograph = addToDiograph(diory)
  const link = generateFileLink(filePath, diory)

  return [diograph, link]
}

async function generateFolderDiographAndLink(folderPath) {
  const { id, diograph } = await generateDiograph(folderPath)

  const diory = diograph[id]
  const link = generateFolderLink(folderPath, diory)

  return [diograph, link]
}

async function generateDiograph(folderPath) {
  const { files = [], subfolders = [] } = (await readPaths(folderPath)) || {}

  const [filesDiograph, fileLinks] = await promiseAllReduce(files.map(generateFileDiographAndLink))

  const [foldersDiograph, folderLinks] = await promiseAllReduce(subfolders.map(generateFolderDiographAndLink))

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
    id: diory.id,
    diograph: {
      ...diograph,
      ...addToDiograph(diory),
    },
  }
}

exports.generateDiograph = generateDiograph
