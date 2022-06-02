import React, { useEffect, useState } from 'react'
import { Room, ElectronClient, ElectronClientMock, RoomClient } from 'diograph-js'

// import Welcome from './features/welcome/Welcome'
import Browser from './features/browser/Browser'
import { setRoom, setStory } from './features/diograph/diographActions'
import { useDispatchActions } from './store'
import { selectStory } from './features/navigation/navigationActions'

const Root = () => {
  const client = window.channelsApi ? new ElectronClient() : new ElectronClientMock()
  const roomClient = new RoomClient({}, undefined, client)
  const { dispatch } = useDispatchActions()

  useEffect(() => {
    const room = new Room(roomClient)
    room.loadRoom().then(() => {
      dispatch(selectStory({ id: room.diograph.rootId }))
      dispatch(setRoom(room))
      // dispatch(setStory(room.diograph.rootId))
    })
  }, [])

  return (
    <>
      <Browser />
      {/* <Welcome /> */}
    </>
  )
}

export default Root
