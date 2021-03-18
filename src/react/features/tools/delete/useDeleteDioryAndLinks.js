import { useStore, useDispatch } from '../../../store'
import { setInactive } from '../../buttons/actions'
import { goBackward } from '../../navigation/actions'
import { deleteDiory, deleteLink } from '../../diograph/actions'

const generateDeletedLinks = (focus, links, isFocusDeleted) => {
  const [{ diograph }] = useStore((state) => state.diograph)

  const linkedDiories = Object.values(links).map(({ id }) => ({
    fromDiory: diograph[focus.id],
    toDiory: diograph[id],
  }))

  let reverseLinkedDiories = []
  if (isFocusDeleted) {
    reverseLinkedDiories = Object.values(diograph)
      .map((diory) => {
        const reverseLinkedDiory = diory.links
          ? Object.entries(diory.links).filter(([, { id }]) => id === focus.id)[0]
          : null
        return reverseLinkedDiory
          ? {
              fromDiory: diograph[reverseLinkedDiory[1].id],
              toDiory: diograph[focus.id],
            }
          : null
      })
      .filter(Boolean)
  }

  return linkedDiories.concat(reverseLinkedDiories)
}

export const useDeleteDioryAndLinks = (focus, clickedDiory) => {
  const isFocusDeleted = focus.id === clickedDiory.id
  const deletedDiory = isFocusDeleted ? focus : null
  const links = isFocusDeleted ? focus.links || {} : { [clickedDiory.id]: { id: clickedDiory.id } }
  const deletedLinks = generateDeletedLinks(focus, links, isFocusDeleted)

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

      dispatch(setInactive())
    },
  }
}
