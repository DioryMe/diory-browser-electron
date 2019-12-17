import React from 'react'
import { useStore } from './store'

import SelectedLens from './features/lenses/SelectedLens'
import Room from './features/room/Room'
import Home from './features/home/Home'

const View = () => {
  const [{ selectedLensId }] = useStore(state => state.lenses)
  const [{ room }] = useStore(state => state.navigation)

  if (selectedLensId) {
    return <SelectedLens/>
  }

  if (room) {
    return <Room/>
  }

  return <Home />
}

export default View
