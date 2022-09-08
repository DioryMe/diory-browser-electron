import { Diograph } from 'diograph-js'

let rootId

const diographInstance = new Diograph()

export function getDiograph(api) {
  return async ({ dioryFolderLocation }) => {
    console.log('diographClient/getDiograph', { dioryFolderLocation })
    const { diograph, rootId: _rootId } = await api.getDiograph({ dioryFolderLocation })

    rootId = _rootId

    diographInstance.addDiograph(diograph)

    return {
      diograph: diographInstance.toObject(),
      rootId,
    }
  }
}

export function saveDiograph(api) {
  return async ({ dioryFolderLocation }) => {
    console.log('diographClient/saveDiograph', dioryFolderLocation)

    // TODO: Debounce
    return api.saveDiograph({
      dioryFolderLocation,
      rootId,
      diograph: diographInstance.toObject(),
    })
  }
}

export function addDiograph(diograph) {
  console.log('diographClient/addDiograph', diograph)

  diographInstance.addDiograph(diograph)
  return {
    diograph: diographInstance.toObject(),
  }
}

export function createDiory(dioryData) {
  console.log('diographClient/createDiory', dioryData)

  const createdDiory = diographInstance.createDiory(dioryData)
  return {
    diory: createdDiory.toObject(),
    diograph: diographInstance.toObject(),
  }
}

export const updateDiory = (diory) => {
  console.log('diographClient/updateDiory', diory)

  const updatedDiory = diographInstance.updateDiory(diory)
  return {
    diory: updatedDiory.toObject(),
    diograph: diographInstance.toObject(),
  }
}

export const deleteDiory = (diory) => {
  console.log('diographClient/deleteDiory', diory)

  diographInstance.deleteDiory(diory)
  return {
    diograph: diographInstance.toObject(),
  }
}

export function createLink(dioryObject, linkedDioryObject) {
  console.log('diographClient/createLink', dioryObject, linkedDioryObject)

  const diory = diographInstance.createLink(dioryObject, linkedDioryObject)
  return {
    diory: diory.toObject(),
    diograph: diographInstance.toObject(),
  }
}

export function deleteLink(dioryObject, linkedDioryObject) {
  console.log('diographClient/deleteLink', dioryObject, linkedDioryObject)

  const diory = diographInstance.deleteLink(dioryObject, linkedDioryObject)
  return {
    diory: diory.toObject(),
    diograph: diographInstance.toObject(),
  }
}

export function searchDiories(queryDiory) {
  console.log('diographClient/searchDiories')

  const resultDiograph = diographInstance.queryDiograph(queryDiory)
  return {
    diograph: Object.values(resultDiograph),
  }
}
