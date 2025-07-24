import { resolveLinkKey } from './resolveLinkKey'
import { resolveDioryKey } from './resolveDioryKey'

function removeLinks(diograph) {
  return Object.entries(diograph).reduce(
    (diographWithoutLinks, [diographKey, { links, ...diory }]) => ({
      ...diographWithoutLinks,
      [diographKey]: diory,
    }),
    {}
  )
}

export function resolveReverseDiograph(diograph) {
  const reverseDiograph = removeLinks(diograph)

  Object.entries(diograph).forEach(([dioryKey, diory]) => {
    if (!diory.links) {
      return
    }

    Object.values(diory.links)
      .map(({ id }) => resolveDioryKey(resolveLinkKey(dioryKey, id), diograph))
      .filter(Boolean)
      .filter((linkKey) => diograph[linkKey])
      .forEach((linkKey) => {
        reverseDiograph[linkKey].links = {
          ...reverseDiograph[linkKey].links,
          [diory.id]: {
            id: dioryKey,
          },
        }
      })
  })

  return reverseDiograph
}
