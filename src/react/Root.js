import React, { useEffect, useState } from 'react'
import { Room, ElectronClient, ElectronClientMock, RoomClient } from 'diograph-js'

import Fullscreen from './components/Fullscreen'
import GridLens from './features/lenses/grid/GridLens'

const Root = () => {
  const client = window.channelsApi ? new ElectronClient() : new ElectronClientMock()
  const roomClient = new RoomClient({}, undefined, client)

  const [loadedRoom, setLoadedRoom] = useState(null)
  const [contentSourceAddress, setContentSourceAddress] = useState(null)

  useEffect(() => {
    const room = new Room(roomClient)
    room.initiateRoom().then(() => {
      setContentSourceAddress('/Users/Jouni/Code/diory-browser-electron/demo-content-room')
      setLoadedRoom(room)
    })
  }, [])

  return (
    loadedRoom && (
      <Fullscreen>
        <GridLens room={loadedRoom} contentSourceAddress={contentSourceAddress} />
      </Fullscreen>
    )
  )
}

export default Root
