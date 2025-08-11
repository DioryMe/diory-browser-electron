import React from 'react'
import { useSelector } from 'react-redux'

import { useSidePanelActions } from '../sidePanel/useSidePanelActions'
import { useDiories } from '../diograph/utils/useDiories'
import { useSaveHomeAddress } from './useSaveHomeAddress'

import { HomeBarView } from './components/HomeBarView'

export const HomeBar = () => {
  const { address } = useSelector((state) => state.home)
  const homeDiories = useDiories(address)
  const actions = useSidePanelActions(homeDiories)
  const { saveHomeAddress } = useSaveHomeAddress()

  return <HomeBarView {...homeDiories} {...actions} onLeaveHome={saveHomeAddress} />
}
