import { addDioryId } from './diographUtils'

export const getDiory = (address, diograph) => {
  const dioryKey = addDioryId(address, diograph)
  if (!diograph[dioryKey]) return undefined

  // TODO: Take key from alias
  const [key] = Object.entries(diograph).find(
    ([diographKey, { id }]) => diograph[dioryKey].id === id && diographKey !== dioryKey
  ) || [dioryKey]

  return { key, ...diograph[dioryKey] }
}
