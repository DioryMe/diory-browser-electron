import { useSelector } from 'react-redux'

import { useSelectedDiories } from '../useSelectedDiories'

import { resolveContextDiories } from '../../diograph/utils/resolveContextDiories'
import { resolveDiories } from '../../diograph/utils/resolveDiories'

export const useDeletedLinks = () => {
  const { selectedDiories = [] } = useSelectedDiories()
  const { diograph } = useSelector((state) => state.diograph)

  return selectedDiories.map((diory) => {
    const navigationState = { storyKey: diory.key }

    const { memories } = resolveDiories(navigationState, diograph)
    const { contexts } = resolveContextDiories(navigationState, diograph)

    const linkedDiories = memories.map((link) => ({
      fromDiory: diory,
      toDiory: link,
    }))
    const reverseLinkedDiories = contexts.map((link) => ({
      fromDiory: link,
      toDiory: diory,
    }))

    return linkedDiories.concat(reverseLinkedDiories)
  }).flat()
}
