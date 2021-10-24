import React, { useEffect } from 'react'
import { useDispatchActions } from './store'

import { enterRoom, setFocus } from './features/navigation/actions'
import { addDiograph } from './features/diograph/actions'
import { useFocus } from './features/diograph/hooks'

import { invokeChannel } from './client/client'
import { invokeAlertDialog } from './client/alertDialog'
import { channels } from '../shared/constants'

import Browser from './Browser'
import Welcome from './features/welcome/Welcome'

export const useGetDiograph = () => {
  const { dispatch } = useDispatchActions()

  useEffect(() => {
    invokeChannel(channels.GET_DIOGRAPH).then(({ rootId, diograph }) => {
      if (!rootId) {
        invokeAlertDialog('Error getting diograph')
      }
      dispatch(addDiograph(diograph))
      dispatch(enterRoom({ id: rootId }))
      dispatch(setFocus({ id: rootId }))
    })
  }, [dispatch])
}

const Root = () => {
  useGetDiograph()
  const { diory } = useFocus()

  return diory ? <Browser /> : <Welcome />
}

export default Root
