import { getDefaultImage } from '../../../shared/getDefaultImage'
import { getDiories as getDioriesFunc } from './getDiories'
import { resolveReverseDiograph } from './resolveReverseDiograph'

export function getDiograph(params) {
  console.log('diographClient/getDiograph', params)

  return window.channelsApi.GET_DIOGRAPH(params)
}

export function saveDiograph(params) {
  console.log('diographClient/saveDiograph', params)

  // TODO: Debounce
  return window.channelsApi.SAVE_DIOGRAPH(params)
}

export function getDiories(dioryId, reverse, diograph) {
  console.log('diographClient/getDiories', dioryId, reverse)

  if (reverse) {
    const reverseDiograph = resolveReverseDiograph(diograph)
    return getDioriesFunc(reverseDiograph, dioryId)
  }

  return getDioriesFunc(diograph, dioryId)
}

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
  const diory = diograph[dioryId]
  const linkKey = Object.entries(diory.links).filter(([, { id }]) => id === linkId)[0][0]
  // eslint-disable-next-line no-unused-vars
  const { [linkKey]: omit, ...links } = diory.links
  return {
    diory: {
      ...diory,
      links,
    },
  }
}

function allKeysExist(queryDiory) {
  return (diory) => !Object.keys(queryDiory).some((key) => !diory[key])
}

function allMatchToQuery(queryDiory) {
  return (diory) =>
    !Object.entries(queryDiory).some(([key, query]) => {
      console.log(diory[key], query, diory[key].toLowerCase().includes(query.toLowerCase()))
      return !diory[key].toLowerCase().includes(query.toLowerCase())
    })
}
export function searchDiories(queryDiory, diograph) {
  return Object.values(diograph)
    .filter(allKeysExist(queryDiory))
    .filter(allMatchToQuery(queryDiory))
}
