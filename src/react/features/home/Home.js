import React from 'react'
import { useSelector } from 'react-redux'

import { useSidePanelActions } from '../sidePanel/useSidePanelActions'
import { useDiories } from '../diograph/utils/useDiories'
import { useSaveHomeAddress } from './useSaveHomeAddress'

import { HomeView } from './components/HomeView'

export const Home = () => {
  const { address } = useSelector((state) => state.home)
  const homeDiories = useDiories(address)
  const actions = useSidePanelActions(homeDiories)
  const { saveHomeAddress } = useSaveHomeAddress()

  return <HomeView {...homeDiories} {...actions} onLeaveHome={saveHomeAddress} />
}
