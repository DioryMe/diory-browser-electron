import React, { useEffect, useState } from 'react'
import { Room, ElectronClient, ElectronClientMock, RoomClient } from 'diograph-js'

// import Fullscreen from './components/Fullscreen'
// import GridLens from './features/lenses/grid/GridLens'
// import Welcome from './features/welcome/Welcome'
import Browser from './features/browser/Browser'

const Root = () => {
  const client = window.channelsApi ? new ElectronClient() : new ElectronClientMock()
  const roomClient = new RoomClient({}, undefined, client)

  const [loadedRoom, setLoadedRoom] = useState(null)

  useEffect(() => {
    const room = new Room(roomClient)
    room.loadRoom().then(() => {
      setLoadedRoom(room)
    })
  }, [])

  return (
    loadedRoom && (
      <>
        <Browser room={loadedRoom} />
        {/* <Welcome /> */}
      </>
    )
  )
}

export default Root
