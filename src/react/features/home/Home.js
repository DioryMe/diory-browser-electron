import React from 'react'
import { Pane, Heading } from 'evergreen-ui'
import { useStore } from '../../store'
import Image from '../../components/diories/Image'
import { enterRoom } from '../navigation/actions'

const useHome = () => {
  const [{ rooms }, dispatch] = useStore(state => state.home)
  const [{ room: roomId }] = useStore(state => state.navigation)
  return {
    rooms: Object.values(rooms).map(room => ({ ...room, inside: room.id === roomId})),
    onClick: (id) => dispatch(enterRoom(id)),
  }
}

const getBackgroundImage = (image, content) => content
  ? `linear-gradient(rgba(255, 255, 255, 0.8),rgba(255, 255, 255, 0.8)), url(${encodeURI(image)})`
  : `url(${encodeURI(image)})`

const Home = () => {
  const { image, rooms, onClick } = useHome()
  return (
    <Pane
      height="100%"
      display="flex"
      flexWrap="wrap"
      padding={24}
    >
      <Image
        backgroundImage={getBackgroundImage(image, rooms.length)}
        zIndex={-1}
      />
      {rooms.map(({ id, key, text, image, inside }) => (
        <Pane
          id={id}
          key={key}
          flex="1 0 200px"
          height={120}
          margin={24}
          elevation={1}
          boxShadow={inside && '0 0 40px #ec4c47'}
          alignSelf="center"
          background="white"
          onClick={() => onClick(id)}
          aria-controls={`panel-${id}`}
          backgroundImage={`linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3)), url(${encodeURI(image)})`}
          style={{ backgroundSize: 'cover' }}
        >
          <Heading margin={16} color="white" fontWeight="bold">{text}</Heading>
        </Pane>
      ))}
    </Pane>
  )
}

export default Home
