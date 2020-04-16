import React from 'react'
import { useStore } from './store'

import FullScreenView from './components/FullScreenView'
import SelectedLens from './features/lenses/SelectedLens'
import RoomView from './features/room/RoomView'
import HomeView from './features/home/HomeView'

const View = () => {
  const [{ selectedLensId }] = useStore((state) => state.lenses)
  const [{ roomId }] = useStore((state) => state.navigation)

  if (!roomId) {
    return <HomeView />
  }

  if (selectedLensId) {
    return (
      <FullScreenView marginTop={48}>
        <SelectedLens />
      </FullScreenView>
    )
  }

  return <RoomView />
}

export default View
