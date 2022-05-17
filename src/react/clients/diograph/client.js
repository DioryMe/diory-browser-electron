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

export function deleteLink(fromDiory, toDiory) {
  const dioryLinks = fromDiory.links
  const linkKey = Object.entries(dioryLinks).filter(([, { id }]) => id === toDiory.id)[0][0]
  // eslint-disable-next-line no-unused-vars
  const { [linkKey]: omit, ...links } = dioryLinks
  return {
    diory: {
      ...fromDiory,
      links,
    }
  }
}