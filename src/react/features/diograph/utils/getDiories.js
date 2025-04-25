import { getDiographKey } from './getDiographKey'
import { getDiory } from './getDiory'

export const getDiories = (links, diograph, parentKey) =>
  Object.entries(links || {})
    .map(([, { id }]) => {
      const key = getDiographKey(parentKey, id)
      return getDiory(key, diograph || {})
    })
    .filter(({ id }) => id)
