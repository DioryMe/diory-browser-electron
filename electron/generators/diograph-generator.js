import { setIdAsKey, isEmpty, reduceValuesToArraysPromise } from '../lib/utils'
import { readPaths } from '../readers/folder-reader'
import { generateFileDiory, generateFolderDiory } from './diory-generator'
import { generateFileLink, generateFolderLink } from './link-generator'

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
  const { files = [], subfolders = [] } = await readPaths(folderPath)

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

export async function generateDiograph(folderPath) {
  const { diograph } = await generateFolderDiographAndLink(folderPath)
  return diograph
}
