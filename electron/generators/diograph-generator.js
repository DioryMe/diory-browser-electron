const { setIdAsKey, isEmpty, reduceValuesToArraysPromise } = require('../lib/utils')
const { readPaths } = require('../readers/folder-reader')
const { generateFileDiory, generateFolderDiory } = require('./diory-generator')
const { generateFileLink, generateFolderLink } = require('./link-generator')

async function generateFileDiographAndLink(filePath) {
  const diory = generateFileDiory(filePath)
  const link = generateFileLink(filePath, diory)

  return {
    diograph: {
      ...setIdAsKey(diory),
    },
    ...(link && { link }),
  }
}

async function generateFolderDiographAndLink(folderPath) {
  const { files = [], subfolders = [] } = await readPaths(folderPath) || {}

  const [filesDiograph, fileLinks] =
    await reduceValuesToArraysPromise(generateFileDiographAndLink)(files)

  const [foldersDiograph, folderLinks] =
    await reduceValuesToArraysPromise(generateFolderDiographAndLink)(subfolders)

  const links = {
    ...folderLinks,
    ...fileLinks,
  }

  const diory = {
    ...generateFolderDiory(folderPath),
    ...(!isEmpty(links) && { links }),
  }
  const link = generateFolderLink(folderPath, diory)

  return {
    diograph: {
      ...filesDiograph,
      ...foldersDiograph,
      ...setIdAsKey(diory),
    },
    ...(link && { link }),
  }
}

exports.generateDiograph = async function generateDiograph(folderPath) {
  const { diograph } = await generateFolderDiographAndLink(folderPath)
  return diograph
}
