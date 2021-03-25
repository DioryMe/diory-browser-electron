import { useStore, useDispatch } from '../../../store'
import { setOpen, setInactive } from '../../buttons/actions'
import { goBackward, setSelectedLink } from '../../navigation/actions'
import { deleteDiory, deleteLink } from '../../diograph/actions'

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

export const useDeleteDioryAndLinks = (focus, clickedDiory) => {
  const isFocusDeleted = focus.id === clickedDiory.id
  const deletedDiory = isFocusDeleted ? focus : null
  const links = isFocusDeleted ? focus.links || {} : { [clickedDiory.id]: { id: clickedDiory.id } }
  const deletedLinks = useGenerateDeletedLinks(focus, links, isFocusDeleted)
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
      deletedLinks.forEach((deletedLink) => {
        if (deletedLink.fromDiory.id === deletedLink.toDiory.id) {
          return
        }
        dispatch(deleteLink(deletedLink.fromDiory, deletedLink.toDiory))
      })

      if (deletedDiory) {
        dispatch(deleteDiory(deletedDiory))
        dispatch(goBackward())
      }

      resetView()
    },
    resetView,
  }
}
