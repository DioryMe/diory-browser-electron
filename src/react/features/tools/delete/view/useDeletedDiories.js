import { useDiories } from '../../../diograph/utils/useDiories'
import { useContextDiories } from '../../../diograph/utils/useContextDiories'

const getLinkedDiories = (story, memories) =>
  (memories || []).map((memory) => ({
    fromDiory: story,
    toDiory: memory,
  }))

const getReverseLinkedDiories = (story, contexts) =>
  (contexts || []).map((context) => ({
    fromDiory: context,
    toDiory: story,
  }))

const isFocusDeleted = (focusDiory, linkDiory) => {
  if (focusDiory && linkDiory && focusDiory.id === linkDiory.id) {
    if (Object.values(focusDiory.links || {}).find(({ id }) => id === focusDiory.id)) {
      return false
    }

    return true
  }

  return false
}

export const useDeletedDiories = () => {
  const { story, memory, memories } = useDiories()
  const { contexts } = useContextDiories()

  if (isFocusDeleted(story, memory)) {
    const linkedDiories = getLinkedDiories(story, memory)
    const reverseLinkedDiories = getReverseLinkedDiories(story, contexts)

    return {
      diory: story,
      links: linkedDiories.concat(reverseLinkedDiories),
    }
  }

  return {
    links: [{ fromDiory: story, toDiory: memory }],
  }
}
