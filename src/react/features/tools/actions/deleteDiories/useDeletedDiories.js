import { useGetContextDiories } from '../../../diograph/utils/useContextDiories'
import { getStoryDiories } from '../../../diograph/utils/getStoryDiories'

export const useDeletedDiories = (diograph, selectedDiories) => {
  const { getContextDiories } = useGetContextDiories(diograph)

  return selectedDiories
    .map((diory) => {
      const { memories } = getStoryDiories(diory.key, diograph)
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
