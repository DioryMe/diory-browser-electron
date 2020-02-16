import React from 'react'
import { Heading, Pane } from 'evergreen-ui'
import { useStore } from '../../store'
import { useGetRoom, useFocusDiory } from './hooks'
import { setFocus } from '../navigation/actions'
import Diory from '../../components/diories/Diory'
import Image from '../../components/diories/Image'

const useRoom = () => {
  useGetRoom()
  const dispatch = useStore()[1]
  const { diory, diorys } = useFocusDiory()
  return {
    diory,
    diorys: diorys.map(diory => ({
      diory,
      onClick: ({ diory }) => dispatch(setFocus({ focus: diory.id })),
    })),
  }
}

const getBackgroundImage = (image, content) =>
  content
    ? `linear-gradient(rgba(255, 255, 255, 0.8),rgba(255, 255, 255, 0.8)), url(${encodeURI(
        image
      )})`
    : `url(${encodeURI(image)})`

const Room = () => {
  const { diory, diorys } = useRoom()
  if (!diory) {
    return <div>loading</div>
  }
  return (
    <Pane
      id={diory.id}
      height="100%"
      display="flex"
      flexWrap="wrap"
      padding={24}
    >
      <Image
        backgroundImage={getBackgroundImage(diory.image, diorys.length)}
        zIndex={-1}
      />
      {!diorys.length && (
        <Heading margin={16} color="darkgrey" fontWeight="bold">
          {diory.text}
        </Heading>
      )}
      {diorys.map(({ diory, onClick }) => (
        <Diory
          key={diory.id}
          diory={diory}
          onClick={onClick}
          flex="1 0 240px"
          height={160}
          margin={24}
          elevation={2}
          alignSelf="center"
          color="white"
          fontWeight="bold"
          background="grey"
          aria-controls={`panel-${diory.id}`}
        />
      ))}
    </Pane>
  )
}

Room.diory = {
  text: 'Room',
  image: 'folder-close',
}

export default Room
