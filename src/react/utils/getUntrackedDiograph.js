import { getUntrackedObject } from 'react-tracked'

export const getUntrackedDiory = (diory) => {
  const untrackedLinks = getUntrackedObject(diory.links)
  if (untrackedLinks) {
    diory.links = { ...untrackedLinks }
  }
  if (diory.data) {
    diory.data = diory.data.map((untrackedData) => ({ ...getUntrackedObject(untrackedData) }))
  }
  return diory
}

// Makes a copy of storeDiograph and deeply resolves the Proxy objects
export const getUntrackedDiograph = (diograph) => {
  const untrackedDiograph = { ...getUntrackedObject(diograph) }
  if (untrackedDiograph) {
    Object.entries(untrackedDiograph).forEach(([key, value]) => {
      untrackedDiograph[key] = getUntrackedDiory(untrackedDiograph[key])
    })
  }
  return untrackedDiograph
}
