import { getUntrackedObject } from '../store'

const getUntrackedDiory = (diory) => {
  const untrackedLinks = getUntrackedObject(diory.links)
  if (untrackedLinks) {
    diory.links = { ...untrackedLinks }
  }
  const untrackedData = getUntrackedObject(diory.data)
  if (untrackedData) {
    diory.data = { ...untrackedData }
  }
  return diory
}

export const getUntrackedDiories = (diories) => diories.map((diory) => getUntrackedDiory(diory))

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
