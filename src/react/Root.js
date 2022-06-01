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
  const [onMemoryClick /* setOnMemoryClick */] = useState(() => {
    console.log('default')
  })

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
      // setOnMemoryClick(({ diory }) => {
      //   console.log('jeefefef')
      //   setStory(room.diograph.getDiory(diory.id))
      // })
    })
  }, [])

  const gridProps = {
    story,
    memories,
    onMemoryClick,
  }

  return (
    <Fullscreen>
      <GridView {...gridProps} />
    </Fullscreen>
  )
}

export default Root
