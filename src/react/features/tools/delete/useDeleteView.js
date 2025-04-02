import { useDispatchActions } from '../../../store'
import { goBackward, selectMemory } from '../../navigation/navigationActions'
import { deleteDiory, deleteLinks } from '../../diograph/diographActions'
import { useDiograph } from '../../diograph/useDiograph'
import { inactivateButton } from '../../buttons/buttonsActions'
import { useDeletedLinks } from './useDeletedLinks'

const isFocusDeleted = (focusDiory, linkDiory) => {
  if (focusDiory && linkDiory && focusDiory.id === linkDiory.id) {
    if (Object.values(focusDiory.links || {}).find(({ id }) => id === focusDiory.id)) {
      return false
    }

    return true
  }

  return false
}

const useDeletedDiory = () => {
  const { story, memory } = useDiograph()
  return isFocusDeleted(story, memory) ? story : null
}

export const useDeleteView = () => {
  const deletedDiory = useDeletedDiory()
  const deletedLinks = useDeletedLinks()

  const { dispatch } = useDispatchActions()

  const deleteDioryAndLinks = () => {
    dispatch(deleteLinks(deletedLinks))

    if (deletedDiory) {
      dispatch(deleteDiory(deletedDiory))
      dispatch(goBackward())
      dispatch(inactivateButton())
    }

    dispatch(selectMemory())
  }

  return {
    diory: deletedDiory,
    links: deletedLinks,
    onDone: deleteDioryAndLinks,
    onCancel: () => dispatch(selectMemory()),
  }
}
