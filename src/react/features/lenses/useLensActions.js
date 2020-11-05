import { useDispatchActions } from '../../store'
import { setActive } from '../buttons/actions'
import { setFocus } from '../navigation/actions'
import { createDiory, createLink, deleteDiory, deleteLink, updateDiory } from '../room/actions'

export const useLensActions = () => {
  const { dispatchAction } = useDispatchActions()

  return {
    createDiory: dispatchAction(createDiory),
    createLink: dispatchAction(createLink),
    updateDiory: dispatchAction(updateDiory),
    deleteDiory: dispatchAction(deleteDiory),
    deleteLink: dispatchAction(deleteLink),
    setActive: dispatchAction(setActive),
    setFocus: dispatchAction(setFocus),
  }
}