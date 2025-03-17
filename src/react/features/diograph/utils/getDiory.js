import { getKeyPath } from './getKeyPath'

export const getDiory = (key, diograph) => {
  if (!key) return

  if (key.endsWith('/') && diograph[key]) {
    const path = getKeyPath(key)
    const dioryId = diograph[key].id
    const rootKey = `${path}/${dioryId}`
    return { key: rootKey, ...diograph[rootKey] }
  }

  return { key, ...diograph[key] }
}
