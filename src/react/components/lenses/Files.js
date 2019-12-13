import React from 'react'
import { Pane } from 'evergreen-ui'
import { useFocus } from '../../hooks'
import Diory from '../diories/Diory'
import Image from '../diories/Image'

const useFocusDiory = () => {
  const { diory, diorys, setFocus } = useFocus()
  return {
    diory,
    diorys: diorys.map(diory => ({
      diory,
      onClick: ({ diory }) => setFocus(diory.id),
    }))
  }
}

const getBackgroundImage = (image, content) => content
  ? `linear-gradient(rgba(255, 255, 255, 0.8),rgba(255, 255, 255, 0.8)), url(${encodeURI(image)})`
  : `url(${encodeURI(image)})`

const Files = () => {
  const { diory, diorys } = useFocusDiory()
  return (
    <Pane
      height="100%"
      display="flex"
      flexWrap="wrap"
      padding={24}
    >
      <Image
        backgroundImage={getBackgroundImage(diory.image, diorys.length)}
        zIndex={-1}
      />
      {diorys.map(({diory, onClick}) => (
        <Diory
          key={diory.id}
          diory={diory}
          onClick={onClick}
          flex="1 0 200px"
          height={120}
          margin={24}
          elevation={2}
          alignSelf="center"
          color="white"
          fontWeight="bold"
          background="white"
          aria-controls={`panel-${diory.id}`}
        />
      ))}
    </Pane>  )
}

Files.diory = {
  text: 'Files',
  image: 'folder-close',
}

export default Files
