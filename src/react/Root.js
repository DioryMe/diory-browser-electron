import React, { useEffect } from 'react'
import { useDispatchActions } from './store'

import { setFocus } from './features/navigation/actions'
import { addDiograph } from './features/diograph/actions'

import { invokeChannel } from './client/client'
import { invokeAlertDialog } from './client/alertDialog'
import { channels } from '../shared/constants'

import Browser from './Browser'
import Welcome from './features/welcome/Welcome'

let retrievedFolderLocation

export const useGetDiograph = () => {
  const { dispatch } = useDispatchActions()

  useEffect(() => {
    invokeChannel(channels.GET_DIOGRAPH).then(({ diograph, rootId, folderLocation }) => {
      if (!rootId) {
        invokeAlertDialog('Error getting diograph')
      }
      retrievedFolderLocation = folderLocation
      dispatch(addDiograph(diograph, rootId, folderLocation))
      dispatch(setFocus({ id: rootId }))
    })
  }, [dispatch])
}

const Root = () => {
  useGetDiograph()

  if (retrievedFolderLocation === undefined) {
    return <div>Loading...</div>
  }

  return retrievedFolderLocation === null ? <Welcome /> : <Browser />
}

export default Root
