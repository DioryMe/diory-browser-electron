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
  console.log('Root rendered')

  const client = window.channelsApi ? new ElectronClient() : new ElectronClientMock()
  const roomClient = new RoomClient(client)

  const [room, setRoom] = useState(null)
  const [connection, setConnection] = useState(null)

  const onDiographChange = () => {
    console.log('Room saved!', room.address)
    room.saveRoom()
  }

  useEffect(() => {
    const room = new Room(roomClient)
    room.loadRoom().then(() => {
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
        setRoom(room)
        setConnection(contentSourceConnection)
      })
    })
  }, [])

  return (
    connection && (
      <Fullscreen>
        <GridLens connection={connection} onDiographChange={onDiographChange} />
      </Fullscreen>
    )
  )
}

export default Root
