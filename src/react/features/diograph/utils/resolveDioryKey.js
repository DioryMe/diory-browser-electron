import { getKeyPath } from './getKeyPath'

export const resolveDioryKey = (key, diograph) => {
  if (!key || !diograph[key]) return null

  if (key.endsWith('/')) {
    const path = getKeyPath(key)
    const dioryId = diograph[key].id
    const rootKey = `${getKeyPath(key)}/${diograph[key].id}`
    return diograph[rootKey] ? rootKey : key
  }

  return key
}
