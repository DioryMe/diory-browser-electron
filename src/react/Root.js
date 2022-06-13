import React, { useEffect, useState } from 'react'
import { Room, ElectronClient, ElectronClientMock, RoomClient, Connection } from 'diograph-js'

import Fullscreen from './components/Fullscreen'
import GridLens from './features/lenses/grid/GridLens'

const selectContentSourceAddress = async () => {
  if (!window.channelsApi) {
    return '/Users/Jouni/Code/diory-browser-electron/demo-content-room'
  }
  return window.channelsApi.showOpenDialog().then(({ filePaths }) => filePaths[0])
}

const Root = () => {
  const client = window.channelsApi ? new ElectronClient() : new ElectronClientMock()
  const roomClient = new RoomClient({}, undefined, client)

  const [loadedRoom, setLoadedRoom] = useState(null)

  useEffect(() => {
    const room = new Room(roomClient)
    room.initiateRoom().then(() => {
      selectContentSourceAddress().then((contentSourceAddress) => {
        const contentSourceConnection = new Connection({
          id: 'content-source',
          address: contentSourceAddress,
          contentClient: 'local',
          contentUrls: {},
          diograph: {
            '/': {
              id: '/',
              text: 'Root',
            },
          },
        })
        room.addConnection(contentSourceConnection)
        setLoadedRoom(room)
      })
    })
  }, [])

  return (
    loadedRoom && (
      <Fullscreen>
        <GridLens connection={loadedRoom.connections[loadedRoom.connections.length - 1]} />
      </Fullscreen>
    )
  )
}

export default Root
