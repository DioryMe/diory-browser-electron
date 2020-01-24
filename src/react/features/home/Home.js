import React from 'react'
import { Pane, Heading } from 'evergreen-ui'
import { useStore } from '../../store'
import { enterRoom } from '../navigation/actions'
import { useHomeChannel } from './hooks'

import Image from '../../components/diories/Image'

const useHome = () => {
  useHomeChannel()
  const [{ rooms }, dispatch] = useStore(state => state.home)
  const [{ room: roomId }] = useStore(state => state.navigation)
  return {
    rooms: Object.values(rooms).map(room => ({
      ...room,
      boxShadow: room.id === roomId ? '0 0 40px #ec4c47' : ''})),
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
      {rooms.map(({ id, text, image, ...diory }) => (
        <Pane
          {...diory}
          id={id}
          key={id}
          flex="1 0 240px"
          height={160}
          margin={24}
          elevation={1}
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
        <div>
          <button onClick={openFileDialog}>Add new room</button>
        </div>
    </Pane>
  )
}

function openFileDialog() {
  window.nativeFileDialog.showOpenDialog({ properties: ['openDirectory'] }).then(result => {
    console.logämk(result.filePaths[0])
    // $('input').val(result.filePaths[0])
  })
}

export default Home
