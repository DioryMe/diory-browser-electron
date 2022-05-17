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

export const updateDiory = (updatedDiory, diograph) => ({
  diory: {
    ...diograph[updatedDiory.id],
    ...updatedDiory,
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

export function createLink(dioryId, linkId, diograph) {
  const diory = diograph[dioryId]
  return {
    diory: {
      ...diory,
      links: {
        ...diory.links,
        [linkId]: { id: linkId },
      },
      modified: new Date().toISOString(),
    },
  }
}

export function deleteLink(dioryId, linkId, diograph) {
  const dioryLinks = diograph[dioryId].links
  const linkKey = Object.entries(dioryLinks).filter(([, { id }]) => id === linkId)[0][0]
  // eslint-disable-next-line no-unused-vars
  const { [linkKey]: omit, ...links } = dioryLinks
  return {
    diory: {
      ...diory,
      links,
    },
  }
}
