import React, { useEffect, useState } from 'react'
import { Room, ElectronClient, ElectronClientMock, RoomClient } from 'diograph-js'
import GridView from './features/lenses/grid/GridView'
import Fullscreen from './components/Fullscreen'

const Root = () => {
  const client = window.channelsApi ? new ElectronClient() : new ElectronClientMock()
  const roomClient = new RoomClient({}, undefined, client)
  const room = new Room(roomClient)

  const [story, setStory] = useState(null)
  const [memories, setMemories] = useState([])

  useEffect(() => {
    console.log('effect')
    room.loadRoom().then(() => {
      const story = room.diograph.getDiory('demo-content-room')
      setStory(story)
      setMemories(
        Object.entries(story.links)
          .map(([key, { id }]) => ({ key, ...room.diograph.getDiory(id) }))
          .filter(({ id }) => id)
      )
    })
  }, [])

  const useDiograph = {
    story,
    memories,
  }

  return (
    <Fullscreen>
      <GridView {...useDiograph} />
    </Fullscreen>
  )
}

export default Root
