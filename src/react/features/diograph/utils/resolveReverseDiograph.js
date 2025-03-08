import { getDiosphereAddress } from './getDiosphereAddress'
import { getDiory } from './getDiory'

function removeLinks(diograph) {
  return Object.entries(diograph).reduce(
    (diographWithoutLinks, [diosphereAddress, { links, ...diory }]) => ({
      ...diographWithoutLinks,
      [diosphereAddress]: diory,
    }),
    {}
  )
}

export function resolveReverseDiograph(diograph) {
  const reverseDiograph = removeLinks(diograph)

  Object.entries(diograph).forEach(([diosphereAddress, diory]) => {
    if (!diory.links) {
      return
    }

    Object.values(diory.links)
      .map(({ id }) => {
        const { address } = getDiory(getDiosphereAddress(diosphereAddress, id), diograph)
        return address
      })
      .filter((address) => diograph[address])
      .forEach((address) => {
        reverseDiograph[address].links = {
          ...reverseDiograph[address].links,
          [diory.id]: {
            id: diosphereAddress,
          },
        }
      })
  })

  return reverseDiograph
}
