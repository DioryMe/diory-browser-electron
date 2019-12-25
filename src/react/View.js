import React from 'react'
import { useStore } from './store'

import SelectedLens from './features/lenses/SelectedLens'
import Room from './features/room/Room'
import HomeView from './features/home/HomeView'

const View = () => {
  const [{ selectedLensId }] = useStore(state => state.lenses)
  const [{ room }] = useStore(state => state.navigation)

  if (selectedLensId) {
    return <SelectedLens/>
  }

  if (room) {
    return <Room/>
  }

  return <HomeView />
}

export default View
