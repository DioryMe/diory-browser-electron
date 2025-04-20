import { useMemo } from 'react'
import { getDiory } from '../../../diograph/utils/getDiory'
import { getDiographKey } from '../../../diograph/utils/getDiographKey'
import { useDiograph } from '../../../diograph/useDiograph'
import { getDefaultImage } from '../../../../../shared/getDefaultImage'

const mapDiographToData = (diograph) => {
  const links = []
  Object.entries(diograph).forEach(([dioryKey, diory]) => {
    if (diory.links) {
      Object.values(diory.links)
        .map(({ id }) => getDiory(getDiographKey(dioryKey, id), diograph))
        .filter(({ key }) => !!diograph[key])
        .forEach(({ key }) => {
          links.push({
            source: dioryKey,
            target: key,
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

export const useGraphData = () => {
  const { story, diograph } = useDiograph()

  const data = useMemo(() => mapDiographToData(diograph), [diograph])
  const storyNode = data.nodes.find(({ id }) => id === story.key)
  return {
    data,
    storyNode,
  }
}
