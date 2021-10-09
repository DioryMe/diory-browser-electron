import { useFilterIsActive } from '../filters/hooks/useFilterIsActive'
import { useFocus, useLinkDiory } from '../diograph/hooks'
import { useFilteredDiorys } from '../filters/useFilteredDiorys'
import { useStore } from '../../store'
import { convertRelativePath, getUntrackedDiory } from '../../utils'

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
  const focusDiorys = useFocus()
  const filteredDiorys = useFilteredDiorys()
  const { diory, diorys, reverseDiorys } = filterIsActive ? filteredDiorys : focusDiorys

  const [{ connections }] = useStore((state) => state.connectors)
  const preparedDiory = diory && prepareDiory(diory, connections)
  const preparedDiorys = diorys.map((diory) => prepareDiory(diory, connections))
  const preparedReverseDiorys = reverseDiorys.map((diory) => prepareDiory(diory, connections))

  const storyDiorys = useLinkDiory()

  return {
    diory: preparedDiory,
    diorys: preparedDiorys,
    reverseDiorys: preparedReverseDiorys,
    storyDiory: storyDiorys.diory,
    memoryDiorys: storyDiorys.diorys,
    contextDiorys: storyDiorys.reverseDiorys,
  }
}
