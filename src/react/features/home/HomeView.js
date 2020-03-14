import React from 'react'
import { Pane } from 'evergreen-ui'
import { useStore } from '../../store'
import { useAddRoom } from '../connector/hooks'
import { enterRoom } from '../navigation/actions'

import Image from '../../components/diories/Image'
import Room from '../../components/Room'
import { getBackgroundImage } from '../../components/utils'

const useHome = () => {
  const [{ rooms }, dispatch] = useStore(state => state.home)
  return {
    rooms: Object.values(rooms).map(room => ({
      room,
      onClick: () => dispatch(enterRoom(room.id)),
    })),
  }
}

const HomeView = () => {
  const { image, rooms } = useHome()
  const { addNewRoom } = useAddRoom()
  return (
    <Pane height="100%" display="flex" flexWrap="wrap" padding={24}>
      <Image
        backgroundImage={getBackgroundImage(image, rooms.length)}
        zIndex={-1}
      />
      {rooms.map(room => (
        <Room {...room} />
      ))}
      <div>
        <button onClick={addNewRoom}>Add new room</button>
      </div>
    </Pane>
  )
}

export default HomeView
