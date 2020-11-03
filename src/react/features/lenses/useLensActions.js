import React from 'react'

import { useDispatchActions } from '../../store'
import { setActive } from '../buttons/actions'
import { setFocus } from '../navigation/actions'
import { createDiory, createLink } from '../room/actions'

export const useLensActions = () => {
  const { dispatchAction } = useDispatchActions()

  return {
    setFocus: dispatchAction(setFocus),
    createDiory: dispatchAction(createDiory),
    createLink: dispatchAction(createLink),
    setActive: dispatchAction(setActive),
  }
}