import { useStore, useDispatch } from '../../../store'
import { setOpen, setInactive } from '../../buttons/actions'
import { goBackward, setSelectedLink } from '../../navigation/actions'
import { deleteDiory, deleteLinks } from '../../diograph/actions'
import { useLinkDiory, useFocus } from '../../diograph/hooks'

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

const isFocusDeleted = (focusDiory, linkDiory) =>
  // TODO: Check if it has link to itself and if has => return false
  focusDiory && linkDiory ? focusDiory.id === linkDiory.id : false

export const useDeleteView = () => {
  const [{ diograph }] = useStore((state) => state.diograph)
  const { diory: focusDiory } = useFocus()
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
    dispatch(setInactive())
    dispatch(setSelectedLink())
    dispatch(setOpen(false))
  }

  const deleteDioryAndLinks = () => {
    dispatch(deleteLinks(deletedLinks))

    if (deletedDiory) {
      dispatch(deleteDiory(deletedDiory))
      dispatch(goBackward())
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
