import { useStore, useDispatch } from '../../../store'
import { goBackward, setSelectedLink } from '../../navigation/actions'
import { deleteDiory, deleteLinks } from '../../diograph/actions'
import { useLinkDiory, useFocus } from '../../diograph/hooks'
import { inactivateButton } from '../../buttons/actions'

const linkedDiories = (focusDiory, diograph) =>
  Object.values(focusDiory.links || []).map(({ id }) => ({
    fromDiory: diograph[focusDiory.id],
    toDiory: diograph[id],
  }))

const reverseLinkedDiories = (focusDiory, diograph) =>
  Object.values(diograph)
    .map((diory) =>
      Object.entries(diory.links || {}).filter(([, { id }]) => id === focusDiory.id)[0]
        ? {
            fromDiory: diograph[diory.id],
            toDiory: diograph[focusDiory.id],
          }
        : null
    )
    .filter(Boolean)

const composeDeletedLinks = (focusDiory, linkDiory, diograph) =>
  linkedDiories(focusDiory, diograph).concat(reverseLinkedDiories(focusDiory, diograph))

const isFocusDeleted = (focusDiory, linkDiory) => {
  if (focusDiory && linkDiory && focusDiory.id === linkDiory.id) {
    if (Object.values(focusDiory.links || {}).find(({ id }) => id === focusDiory.id)) {
      return false
    }

    return true
  }

  return false
}

export const useDeleteView = () => {
  const [{ diograph }] = useStore((state) => state.diograph)
  const { diory: focusDiory } = useFocus()
  // NOTE: linkDiory might be also same as focusDiory, should it be clickedDiory instead?
  const { diory: linkDiory } = useLinkDiory()
  const dispatch = useDispatch()

  let deletedDiory
  let deletedLinks
  if (isFocusDeleted(focusDiory, linkDiory)) {
    deletedDiory = focusDiory
    deletedLinks = composeDeletedLinks(focusDiory, linkDiory, diograph)
  } else {
    deletedDiory = null
    deletedLinks = [{ fromDiory: focusDiory, toDiory: linkDiory }]
  }

  const resetView = () => {
    dispatch(setSelectedLink())
  }

  const deleteDioryAndLinks = () => {
    dispatch(deleteLinks(deletedLinks))

    if (deletedDiory) {
      dispatch(deleteDiory(deletedDiory))
      dispatch(goBackward())
      dispatch(inactivateButton())
    }

    resetView()
  }

  return {
    diory: deletedDiory,
    diorys: deletedLinks,
    onDone: deleteDioryAndLinks,
    onCancel: resetView,
  }
}
