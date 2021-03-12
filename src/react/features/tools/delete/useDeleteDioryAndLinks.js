import { useDispatch } from '../../../store'
import { setInactive } from '../../buttons/actions'
import { goBackward } from '../../navigation/actions'
import { deleteDiory, deleteLink } from '../../diograph/actions'

const generateDeletedLinks = (focus, links) =>
  Object.values(links).map(({ id }) => ({
    fromDiory: { id: focus.id },
    toDiory: { id },
  }))

export const useDeleteDioryAndLinks = (focus, clickedDiory) => {
  const deleteDioryInFocus = focus.id === clickedDiory.id
  const deletedDiory = deleteDioryInFocus ? focus : null
  const links = deleteDioryInFocus
    ? focus.links || {}
    : { [clickedDiory.id]: { id: clickedDiory.id } }
  const deletedLinks = generateDeletedLinks(focus, links)

  const dispatch = useDispatch()
  return {
    deletedLinks,
    deletedDiory,
    deleteDioryAndLinks: () => {
      if (deletedDiory) {
        dispatch(deleteDiory(deletedDiory))
      }

      deletedLinks.forEach((deletedLink) => {
        if (deletedLink.fromDiory.id === deletedLink.toDiory.id) {
          return
        }
        dispatch(deleteLink(deletedLink.fromDiory, deletedLink.toDiory))
      })

      if (deleteDioryInFocus) {
        dispatch(goBackward())
      }

      dispatch(setInactive())
    },
  }
}
