import { useGetContextDiories } from '../../diograph/utils/useContextDiories'
import { useSelectedDiories } from '../useSelectedDiories'
import { useGetDiories } from '../../diograph/utils/useDiories'

export const useDeletedDiories = () => {
  const { selectedDiories = [] } = useSelectedDiories()
  const { getDiories } = useGetDiories()
  const { getContextDiories } = useGetContextDiories()

  return selectedDiories
    .map((diory) => {
      const { memories } = getDiories(diory.key)
      const { contexts } = getContextDiories(diory.key)

      const linkedDiories = memories.map((link) => ({
        fromDiory: diory,
        toDiory: link,
      }))
      const reverseLinkedDiories = contexts.map((link) => ({
        fromDiory: link,
        toDiory: diory,
      }))

      return linkedDiories.concat(reverseLinkedDiories)
    })
    .flat()
}
