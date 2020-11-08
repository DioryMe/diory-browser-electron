import { useCallback } from 'react'
import { useDispatchActions } from '../../store'
import { setActive, setInactive } from '../buttons/actions'
import { setFocus } from '../navigation/actions'
import { createDiory, createLink, deleteDiory, deleteLink, updateDiory } from '../diograph/actions'

export const useLensActions = () => {
  const { dispatchAction } = useDispatchActions()

  return {
    createDiory: useCallback(dispatchAction(createDiory), []),
    createLink: useCallback(dispatchAction(createLink), []),
    updateDiory: useCallback(dispatchAction(updateDiory), []),
    deleteDiory: useCallback(dispatchAction(deleteDiory), []),
    deleteLink: useCallback(dispatchAction(deleteLink), []),
    setActive: useCallback(dispatchAction(setActive), []),
    setInactive: useCallback(dispatchAction(setInactive), []),
    setFocus: useCallback(dispatchAction(setFocus), []),
  }
}