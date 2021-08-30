import { getUntrackedObject } from 'react-tracked'

export const getUntrackedDiory = (diory = {}) => {
  const untrackedLinks = getUntrackedObject(diory.links)
  if (untrackedLinks) {
    diory.links = { ...untrackedLinks }
  }
  const untrackedData = getUntrackedObject(diory.data)
  if (untrackedData) {
    diory.data = [{ ...untrackedData[0] }]
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
