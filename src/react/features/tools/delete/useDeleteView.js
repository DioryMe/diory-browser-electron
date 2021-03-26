import { useStore, useDispatch } from '../../../store'
import { setOpen, setInactive } from '../../buttons/actions'
import { goBackward, setSelectedLink } from '../../navigation/actions'
import { deleteDiory, deleteLinks } from '../../diograph/actions'

const useLinkedDiories = (focusDiory, diograph) =>
  Object.values(focusDiory.links || []).map(({ id }) => ({
    fromDiory: diograph[focusDiory.id],
    toDiory: diograph[id],
  }))

const useReverseLinkedDiories = (focusDiory, diograph) =>
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

const useDeletedLinks = (focusDiory, linkDiory) => {
  const [{ diograph }] = useStore((state) => state.diograph)
  const linkedDiories = useLinkedDiories(focusDiory, diograph)
  const reverseLinkedDiories = useReverseLinkedDiories(focusDiory, diograph)
  return linkedDiories.concat(reverseLinkedDiories)
}

const useIsFocusDeleted = (focusDiory, linkDiory) => {
  // TODO: Check if it has link to itself and if has => return false
  return focusDiory && linkDiory ? focusDiory.id === linkDiory.id : false
}

export const useDeleteView = (focusDiory, linkDiory) => {
  const dispatch = useDispatch()

  const isFocusDeleted = useIsFocusDeleted(focusDiory, linkDiory)
  const [deletedDiory, deletedLinks] = isFocusDeleted
    ? [focusDiory, useDeletedLinks(focusDiory, linkDiory)]
    : [null, [{ fromDiory: focusDiory, toDiory: linkDiory }]]

  const resetView = () => {
    dispatch(setInactive())
    dispatch(setSelectedLink())
    dispatch(setOpen(false))
  }

  return {
    deletedDiory,
    deletedLinks,
    deleteDioryAndLinks: () => {
      dispatch(deleteLinks(deletedLinks))

      if (deletedDiory) {
        dispatch(deleteDiory(deletedDiory))
        dispatch(goBackward())
      }

      resetView()
    },
    resetView,
  }
}
