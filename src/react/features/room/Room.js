import React from 'react'
import { Heading, Pane } from 'evergreen-ui'
import { useDispatch } from '../../store'
import { useFocusDiory } from './hooks'
import { setFocus } from '../navigation/actions'
import Diory from '../../components/diories/Diory'
import Image from '../../components/diories/Image'
import { getBackgroundImage } from '../../components/utils'

const useRoom = () => {
  const dispatch = useDispatch()
  const { diory, diorys } = useFocusDiory()
  return {
    diory,
    diorys: diorys.map(diory => ({
      diory,
      onClick: ({ diory }) => dispatch(setFocus({ focus: diory.id })),
    })),
  }
}

const MAX_NUMBER_OF_DIORYS_PER_VIEW = 100

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
      {diorys
        .slice(0, MAX_NUMBER_OF_DIORYS_PER_VIEW)
        .map(({ diory, onClick }) => (
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
