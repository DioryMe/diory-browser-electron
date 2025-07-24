import { resolveDioryKey } from './resolveDioryKey'

export const getDiory = (address, diograph) => {
  const key = resolveDioryKey(address, diograph)
  return key ? { key, ...diograph[key] } : null
}
