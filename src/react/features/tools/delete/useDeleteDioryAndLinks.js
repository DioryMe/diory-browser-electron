import { useDispatch } from '../../../store'
import { setInactive } from '../../buttons/actions'
import { goBackward } from '../../navigation/actions'
import { deleteDiory, deleteLink } from '../../diograph/actions'

export const useDeleteDioryAndLinks = (focus, clickedDiory) => {
  const deleteDioryInFocus = focus.id === clickedDiory.id
  const deletedDiory = deleteDioryInFocus ? focus : null
  let deletedLinks = []

  if (!deleteDioryInFocus) {
    deletedLinks = [
      {
        fromDiory: focus,
        toDiory: clickedDiory,
      },
    ]
  }

  const dispatch = useDispatch()
  return {
    deletedLinks,
    deletedDiory,
    deleteDioryAndLinks: () => {
      if (deletedDiory) {
        dispatch(deleteDiory(deletedDiory))
      }

      deletedLinks.map((deletedLink) =>
        dispatch(deleteLink(deletedLink.fromDiory, deletedLink.toDiory))
      )

      if (deleteDioryInFocus) {
        dispatch(goBackward())
      }

      dispatch(setInactive())
    },
  }
}
