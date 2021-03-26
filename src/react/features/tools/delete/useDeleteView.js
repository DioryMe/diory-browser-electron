import { useStore, useDispatch } from '../../../store'
import { setOpen, setInactive } from '../../buttons/actions'
import { goBackward, setSelectedLink } from '../../navigation/actions'
import { deleteDiory, deleteLinks } from '../../diograph/actions'

export const useDeleteView = (focusDiory, linkDiory) => {
  const isFocusDeleted = focusDiory && linkDiory ? focusDiory.id === linkDiory.id : false
  const deletedDiory = isFocusDeleted ? focusDiory : null

  const links =
    focusDiory && linkDiory
      ? isFocusDeleted
        ? focusDiory.links || {}
        : { [linkDiory.id]: { id: linkDiory.id } }
      : []
  const deletedLinks = useGenerateDeletedLinks(focusDiory, links, isFocusDeleted)

  return useDeleteDioryAndLinks(deletedDiory, deletedLinks)
}

const useGenerateDeletedLinks = (focus, links, isFocusDeleted) => {
  const [{ diograph }] = useStore((state) => state.diograph)

  const linkedDiories = Object.values(links).map(({ id }) => ({
    fromDiory: diograph[focus.id],
    toDiory: diograph[id],
  }))

  if (isFocusDeleted) {
    const reverseLinkedDiories = Object.values(diograph)
      .map((diory) => {
        const reverseLinkedDiory = diory.links
          ? Object.entries(diory.links).filter(([, { id }]) => id === focus.id)[0]
          : null
        return reverseLinkedDiory
          ? {
              fromDiory: diograph[diory.id],
              toDiory: diograph[focus.id],
            }
          : null
      })
      .filter(Boolean)
    return linkedDiories.concat(reverseLinkedDiories)
  }

  return linkedDiories
}

const useDeleteDioryAndLinks = (deletedDiory, deletedLinks) => {
  const resetView = () => {
    dispatch(setInactive())
    dispatch(setSelectedLink())
    dispatch(setOpen(false))
  }

  const dispatch = useDispatch()
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
