import React, { useEffect, useState } from 'react'
import { Room, ElectronClient, ElectronClientMock, RoomClient } from 'diograph-js'
import GridView from './features/lenses/grid/GridView'

const Root = () => {
  const client = window.channelsApi ? new ElectronClient() : new ElectronClientMock()
  const roomClient = new RoomClient({}, undefined, client)
  const room = new Room(roomClient)

  const [story, setStory] = useState(null)

  useEffect(() => {
    console.log('effect')
    room.loadRoom().then(() => {
      const story = room.diograph.getDiory('uuid-1')
      setStory(story)
    })
  }, [])

  const useDiograph = {
    // context,
    // contexts,
    story, // : diograph[storyId],
    memories: [],
    // stories: useLinkedDiorys(contextId, diograph),
    // memory: diograph[memoryId],
    // memories: useLinkedDiorys(storyId, diograph),
  }

  return <GridView {...useDiograph} />
}

export default Root
