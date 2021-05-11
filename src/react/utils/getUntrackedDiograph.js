import { getUntrackedObject } from '../store'

// Makes a copy of storeDiograph and deeply resolves the Proxy objects
export const getUntrackedDiograph = (diograph) => {
  const untrackedDiograph = { ...getUntrackedObject(diograph) }
  if (untrackedDiograph) {
    Object.entries(untrackedDiograph).forEach(([key, value]) => {
      const untrackedLinks = getUntrackedObject(untrackedDiograph[key].links)
      if (untrackedLinks) {
        untrackedDiograph[key].links = { ...untrackedLinks }
      }
      const untrackedData = getUntrackedObject(untrackedDiograph[key].data)
      if (untrackedData) {
        untrackedDiograph[key].data = { ...untrackedData }
      }
    })
  }
  return untrackedDiograph
}
