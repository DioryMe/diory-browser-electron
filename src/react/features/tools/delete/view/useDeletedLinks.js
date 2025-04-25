import { useDiories } from '../../../diograph/utils/useDiories'
import { useContextDiories } from '../../../diograph/utils/useContextDiories'

const linkedDiories = (story, memories) =>
  (memories || []).map((memory) => ({
    fromDiory: story,
    toDiory: memory,
  }))

const reverseLinkedDiories = (story, contexts) =>
  (contexts || []).map((context) => ({
    fromDiory: context,
    toDiory: story,
  }))

const composeDeletedLinks = (story, memories, contexts) =>
  linkedDiories(story, memories).concat(reverseLinkedDiories(story, contexts))

const isFocusDeleted = (focusDiory, linkDiory) => {
  if (focusDiory && linkDiory && focusDiory.id === linkDiory.id) {
    if (Object.values(focusDiory.links || {}).find(({ id }) => id === focusDiory.id)) {
      return false
    }

    return true
  }

  return false
}

export const useDeletedLinks = () => {
  const { story, memory, memories } = useDiories()
  const { contexts } = useContextDiories()
  let deletedLinks
  if (isFocusDeleted(story, memory)) {
    deletedLinks = composeDeletedLinks(story, memories, contexts)
  } else {
    deletedLinks = [{ fromDiory: story, toDiory: memory }]
  }

  return deletedLinks
}
