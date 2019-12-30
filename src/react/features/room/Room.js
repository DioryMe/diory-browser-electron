import React from 'react'
import { Heading, Pane } from 'evergreen-ui'
import { useStore } from '../../store'
import { useRoomChannel, useFocusDiory } from './hooks'
import { useLeft, useRight } from '../navigation/hooks'
import { goBackward, setFocus } from '../navigation/actions'
import Diory from '../../components/diories/Diory'
import Image from '../../components/diories/Image'

const useRoom = () => {
  useRoomChannel()
  const dispatch = useStore()[1]
  const { diory, diorys } = useFocusDiory()
  const { onLeft } = useLeft()
  const { onRight } = useRight()
  const onBackward = () => dispatch(goBackward())
  return {
    diory,
    diorys: diorys.map(diory => ({
      diory,
      onClick: ({ diory }) => dispatch(setFocus({ focus: diory.id })),
    })),
    onLeftClick: onLeft || onBackward,
    onRightClick: onRight || onBackward,
  }
}

const getBackgroundImage = (image, content) =>
  content
    ? `linear-gradient(rgba(255, 255, 255, 0.8),rgba(255, 255, 255, 0.8)), url(${encodeURI(
        image
      )})`
    : `url(${encodeURI(image)})`

const Room = () => {
  const { diory, diorys, onLeftClick, onRightClick } = useRoom()
  if (!diory) {
    return <div>loading</div>
  }
  return (
    <Pane height="100%" display="flex" flexWrap="wrap" padding={24}>
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
      <div
        onClick={onLeftClick}
        style={{
          position: 'absolute',
          left: 0,
          top: 50,
          bottom: 0,
          width: '100px',
        }}
      />
      <div
        onClick={onRightClick}
        style={{
          position: 'absolute',
          right: 0,
          top: 50,
          bottom: 0,
          width: '100px',
        }}
      />
    </Pane>
  )
}

Room.diory = {
  text: 'Room',
  image: 'folder-close',
}

export default Room
