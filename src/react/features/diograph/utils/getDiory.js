import { getKeyPath } from './getKeyPath'

export const getDiory = (key, diograph) => {
  if (!key) return

  if (key.endsWith('/') && diograph[key]) {
    const path = getKeyPath(key)
    const dioryId = diograph[key].id
    const rootKey = `${path}/${dioryId}`
    return diograph[rootKey] ? { key: rootKey, ...diograph[rootKey] } : { key, ...diograph[key] }
  }

  return { key, ...diograph[key] }
}
