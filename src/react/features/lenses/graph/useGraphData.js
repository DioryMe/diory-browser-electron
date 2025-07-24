import { useMemo } from 'react'
import { getDiory } from '../../diograph/utils/getDiory'
import { resolveLinkKey } from '../../diograph/utils/resolveLinkKey'
import { getDefaultImage } from '../../../../shared/getDefaultImage'
import { resolveDioryKey } from '../../diograph/utils/resolveDioryKey'

const mapDiographToData = (diograph) => {
  const links = []
  Object.entries(diograph).forEach(([dioryKey, diory]) => {
    if (diory.links) {
      Object.values(diory.links)
        .map(({ id }) => resolveDioryKey(resolveLinkKey(dioryKey, id), diograph))
        .filter((linkKey) => !!diograph[linkKey])
        .forEach((linkKey) => {
          links.push({
            source: dioryKey,
            target: linkKey,
          })
        })
    }
  })

  const nodes = Object.entries(diograph)
    .filter(([key]) => !key.endsWith('/'))
    .map(([key, diory]) => ({
      ...diory,
      key,
      id: key,
      image: diory.image || getDefaultImage(),
    }))

  return {
    nodes,
    links,
  }
}

export const useGraphData = (diograph) => useMemo(() => mapDiographToData(diograph), [diograph])
