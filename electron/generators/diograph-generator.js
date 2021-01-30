const { isEmpty, promiseAllReduce } = require('../lib/utils')
const { readFolderContents } = require('../readers/folder-reader')
const { generateFileDiory, generateFolderDiory } = require('./diory-generator')
const { generateFileLink, generateFolderLink } = require('./link-generator')

function getDioryDiographs(diograph, dioryIds) {
  return dioryIds.map((dioryId) => diograph[dioryId])
}

// MOVED TO LINK GENERATOR
// function addToDiograph(rootDiory) {
//   return (
//     rootDiory.id && {
//       [rootDiory.id]: rootDiory,
//     }
//   )
// }

async function generateDiographAndLinkFromFile(filePath) {
  const fileDiory = generateDioryFromFile(filePath)

  const fileDiograph = addToDiograph(fileDiory)
  const fileLink = generateLinkToFileDiory(filePath, fileDiory)

  return [fileDiograph, fileLink]
}

async function generateDiographAndLinkFromFolder(folderPath) {
  // TÄSSÄ LÄHTEE REKURSOIMAAN!!!
  // - menee oksia pitkin lehtiin asti ja lehdistä lähtien luo diographia
  const { id, diograph } = await generateDiograph(folderPath) // eslint-disable-line  no-use-before-define

  const folderDiory = diograph[id]
  const folderLink = generateLinkToFolderDiory(folderPath, folderDiory)

  return [diograph, folderLink]
}

async function generateDiograph(folderPath) {
  const { files = [], subfolders = [] } = (await readFolderContents(folderPath)) || {}

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

  const linkedDioryIds = Object.values(links).map({ id } => id)
  const linkedDiorys = getDioryDiographs(diograph, linkedDioryIds)

  const rootDiory = {
    ...generateFolderDiory(folderPath, linkedDiorys),
    ...(!isEmpty(links) && { links }),
  }

  return {
    id: rootDiory.id,
    diograph: {
      ...diograph,
      ...addToDiograph(rootDiory),
    },
  }
}

exports.generateDiograph = generateDiograph
