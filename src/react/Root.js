import React, { useEffect } from 'react'
import { useDispatchActions, useStore } from './store'

import { setFocus } from './features/navigation/actions'
import { addDiograph } from './features/diograph/actions'

import { invokeChannel } from './client/client'
import { channels } from '../shared/constants'

import Browser from './Browser'
import Welcome from './features/welcome/Welcome'

export const useGetDiograph = () => {
  const { dispatch } = useDispatchActions()

  useEffect(() => {
    invokeChannel(channels.GET_DIOGRAPH).then(({ diograph, rootId, folderLocation }) => {
      dispatch(addDiograph(diograph, rootId, folderLocation))
      dispatch(setFocus({ id: rootId }))
    })
  }, [dispatch])
}

const Root = () => {
  const [{ folderLocation }] = useStore((state) => state.diograph)

  useGetDiograph()

  if (folderLocation === undefined) {
    return <div>Loading...</div>
  }

  return folderLocation === null ? <Welcome /> : <Browser />
}

export default Root
