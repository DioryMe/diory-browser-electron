import React from 'react'
import { useStore } from './store'

import FullScreenView from './components/FullScreenView'
import SelectedLens from './features/lenses/SelectedLens'
import Room from './features/room/Room'
import HomeView from './features/home/HomeView'

const View = () => {
  const [{ selectedLensId }] = useStore(state => state.lenses)
  const [{ room }] = useStore(state => state.navigation)

  if (selectedLensId) {
    return (
      <FullScreenView marginTop={48}>
        <SelectedLens />
      </FullScreenView>
    )
  }

  if (room) {
    return <Room />
  }

  return <HomeView />
}

export default View
