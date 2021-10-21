import { useStore } from '../../store'
import { getUntrackedDiory, convertRelativePath } from '../../utils'

import { useStory } from '../diograph/hooks'
import { useFilterIsActive } from '../filters/hooks/useFilterIsActive'
import { useFilteredDiorys } from '../filters/useFilteredDiorys'

const prepareDiory = (diory, connections) => {
  const preparedDiory = getUntrackedDiory(diory)
  if (preparedDiory) {
    preparedDiory.image = convertRelativePath(preparedDiory.image, connections)
    if (preparedDiory.data) {
      preparedDiory.data[0].contentUrl = convertRelativePath(
        preparedDiory.data[0].contentUrl,
        connections
      )
    }
  }
  return preparedDiory
}

export const useLens = () => {
  const { filterIsActive } = useFilterIsActive()
  const focusDiorys = useStory()
  const filteredDiorys = useFilteredDiorys()
  const { story, memories } = filterIsActive ? filteredDiorys : focusDiorys
  const [{ selectedLensId }] = useStore((state) => state.lenses)

  const [{ connections }] = useStore((state) => state.connectors)
  const preparedDiory = story && prepareDiory(story, connections)
  const preparedDiorys = memories.map((diory) => prepareDiory(diory, connections))

  return {
    selectedLensId,
    story: preparedDiory,
    memories: preparedDiorys,
  }
}
