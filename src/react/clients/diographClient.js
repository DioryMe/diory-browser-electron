import { getDefaultImage } from '../../shared/getDefaultImage'

let diograph
let rootId

export function getDiograph(api) {
  return async ({ dioryFolderLocation }) => {
    console.log('diographClient/getDiograph', { dioryFolderLocation })
    const { diograph: _diograph, rootId: _rootId } = await api.getDiograph({ dioryFolderLocation })

    diograph = _diograph
    rootId = _rootId

    return {
      diograph,
      rootId,
    }
  }
}

export function saveDiograph(api) {
  return async ({ dioryFolderLocation }) => {
    console.log('diographClient/saveDiograph', params)

    // TODO: Debounce
    return api.saveDiograph({ dioryFolderLocation, rootId, diograph })
  }
}

export function addDiograph(_diograph) {
  console.log('diographClient/addDiograph')

  diograph = {
    ...diograph,
    _diograph,
  }

  return diograph
}

export function createDiory(_diory) {
  console.log('diographClient/createDiory', _diory)
  console.log(diograph)

  diograph[_diory.id] = {
    ..._diory,
    image: _diory.image || getDefaultImage(),
    created: new Date().toISOString(),
  }

  return diograph
}

export const updateDiory = (updatedDiory) => {
  console.log('diographClient/updateDiory')

  diograph[updatedDiory.id] = {
    ...diograph[updatedDiory.id],
    ...updatedDiory,
    updated: new Date().toISOString(),
  }

  return diograph
}

export const deleteDiory = (diory) => {
  console.log('diographClient/deleteDiory')

  // eslint-disable-next-line no-unused-vars
  const { [diory.id]: omit, ..._diograph } = diograph

  diograph = _diograph
  return diograph
}

export function createLink(dioryId, linkId) {
  const _diory = diograph[dioryId]

  diograph[dioryId] = {
    ..._diory,
    links: {
      ..._diory.links,
      [linkId]: { id: linkId },
    },
    modified: new Date().toISOString(),
  }

  return diograph
}

export function deleteLink(dioryId, linkId) {
  const _diory = diograph[dioryId]
  const linkKey = Object.entries(_diory.links).filter(([, { id }]) => id === linkId)[0][0]
  // eslint-disable-next-line no-unused-vars
  const { [linkKey]: omit, ...links } = _diory.links

  diograph[dioryId] = { ..._diory, links }
  return diograph
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
export function searchDiories(queryDiory) {
  return Object.values(diograph)
    .filter(allKeysExist(queryDiory))
    .filter(allMatchToQuery(queryDiory))
}
