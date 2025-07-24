import { getKeyPath } from './getKeyPath'

export const resolveLinkKey = (dioryKey, linkKey) => {
  const parentPath = getKeyPath(dioryKey)

  const keyParts = linkKey.split('/')
  if (keyParts.length === 1 && parentPath) {
    return `${parentPath}/${linkKey}`
  }

  if (linkKey.startsWith('/')) {
    return `${parentPath}${linkKey}`
  }

  return linkKey
}
