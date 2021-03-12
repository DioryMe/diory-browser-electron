import { useStore, useDispatch } from '../../../store'
import { setInactive } from '../../buttons/actions'
import { goBackward } from '../../navigation/actions'
import { deleteDiory, deleteLink } from '../../diograph/actions'

const generateDeletedLinks = (focus, links) => {
  const [{ diograph }] = useStore((state) => state.diograph)
  return Object.values(links).map(({ id }) => ({
    fromDiory: diograph[focus.id],
    toDiory: diograph[id],
  }))
}

export const useDeleteDioryAndLinks = (focus, clickedDiory) => {
  const deleteDioryInFocus = focus.id === clickedDiory.id
  const deletedDiory = deleteDioryInFocus ? focus : null
  const links = deleteDioryInFocus
    ? focus.links || {}
    : { [clickedDiory.id]: { id: clickedDiory.id } }
  const deletedLinks = generateDeletedLinks(focus, links)

  const dispatch = useDispatch()
  return {
    deletedDiory,
    deletedLinks,
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
