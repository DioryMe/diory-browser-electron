import { getKeyPath } from './getKeyPath'

export const getDiographKey = (parentKey, key) => {
  const parentPath = getKeyPath(parentKey)

  const keyParts = key.split('/')
  if (keyParts.length === 1 && parentPath) {
    return `${parentPath}/${key}`
  }

  if (key.startsWith('/')) {
    return `${parentPath}${key}`
  }

  return key
}
