import { getDefaultImage } from '../../../shared/getDefaultImage'

export function createDiory(diory) {
  console.log('diographClient/createDiory')

  return {
    diory: {
      ...diory,
      image: diory.image || getDefaultImage(),
      created: new Date().toISOString(),
    },
  }
}

export const updateDiory = (diory) => ({
  diory: {
    ...diory,
    updated: new Date().toISOString(),
  },
})

export const deleteDiory = (diory) => {
  console.log('diographClient/deleteDiory')

  const now = new Date().toISOString()
  return {
    diory: {
      ...diory,
      updated: now,
      deleted: now,
    },
  }
}

export function createLink(diory, link) {
  console.log(diory, link)
  return {
    diory: {
      ...diory,
      modified: new Date().toISOString(),
    },
    link,
  }
}

// Currently this is not used anywhere
// - same as deleteLinks but takes {} as an argument instead of [{}]
export const deleteLink = (fromDiory, toDiory) => ({
  fromDiory: {
    ...fromDiory,
    modified: new Date().toISOString(),
  },
  toDiory,
})

export const deleteLinks = (deletedLinks) =>
  deletedLinks.map(({ fromDiory, toDiory }) => ({
    fromDiory: {
      ...fromDiory,
      modified: new Date().toISOString(),
    },
    toDiory,
  }))
