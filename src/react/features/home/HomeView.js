import React from 'react'
import { Pane } from 'evergreen-ui'
import { useStore } from '../../store'
import { enterRoom } from '../navigation/actions'
import { useHomeChannel } from './hooks'

import Image from '../../components/diories/Image'
import Room from '../../components/Room'

const useHome = () => {
  useHomeChannel()
  const [{ rooms }, dispatch] = useStore(state => state.home)
  return {
    rooms: Object.values(rooms).map(room => ({
      room,
      onClick: () => dispatch(enterRoom(room.id)),
    })),
  }
}

const getBackgroundImage = (image, content) =>
  content
    ? `linear-gradient(rgba(255, 255, 255, 0.8),rgba(255, 255, 255, 0.8)), url(${encodeURI(
        image
      )})`
    : `url(${encodeURI(image)})`

const HomeView = () => {
  const { image, rooms } = useHome()
  return (
    <Pane height="100%" display="flex" flexWrap="wrap" padding={24}>
      <Image
        backgroundImage={getBackgroundImage(image, rooms.length)}
        zIndex={-1}
      />
      {rooms.map(room => (
        <Room {...room} />
      ))}
    </Pane>
  )
}

export default HomeView
