import React from 'react'
import PropTypes from 'prop-types'

import BackgroundDiory from '../../../components/diories/BackgroundDiory'
import DataAwareDiory from '../../../components/diories/DataAwareDiory'
import Diory from '../../../components/diories/Diory'
import FocusContainer from '../../../components/FocusContainer'
import LinkDioryContainer from '../../../components/LinkDioryContainer'
import Fullscreen from '../../../components/Fullscreen'
import FullscreenButton from '../fullscreen/FullscreenButton'

const GridView = ({ diory, diorys, reverseDiorys = [], selectedDiory, onDrop, onClick }) => (
  <Fullscreen marginTop={48} zIndex={-1}>
    <BackgroundDiory
      diory={{ id: diory.id, image: diory.image, text: diory.text }}
      gradient
      onClick={onClick}
    >
      {reverseDiorys.map((linkDiory) => (
        <LinkDioryContainer linkDiory={linkDiory} onDrop={onDrop} onClick={onClick}>
          <Diory
            key={linkDiory.id}
            diory={linkDiory}
            onClick={onClick}
            elevation={2}
            aria-controls={`panel-${linkDiory.id}`}
            style={
              selectedDiory && linkDiory.id === selectedDiory.id
                ? { border: '10px solid blue' }
                : undefined
            }
          />
        </LinkDioryContainer>
      ))}
      <FocusContainer
        diory={diory}
        onClick={onClick}
        onDrop={onDrop}
        style={{ flex: '1 0 100%', height: 480, padding: 24 }}
      >
        <FullscreenButton />
        <DataAwareDiory diory={diory} />
      </FocusContainer>
      {diorys.map((linkDiory) => (
        <LinkDioryContainer linkDiory={linkDiory} onDrop={onDrop} onClick={onClick}>
          <Diory
            key={linkDiory.id}
            diory={linkDiory}
            onClick={onClick}
            elevation={2}
            aria-controls={`panel-${linkDiory.id}`}
            style={
              selectedDiory && linkDiory.id === selectedDiory.id
                ? { border: '10px solid blue' }
                : undefined
            }
          />
        </LinkDioryContainer>
      ))}
    </BackgroundDiory>
  </Fullscreen>
)

GridView.defaultProps = {
  onClick: () => {},
  onDrop: () => {},
}

GridView.propTypes = {
  diory: PropTypes.object.isRequired,
  diorys: PropTypes.array.isRequired,
  reverseDiorys: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  onDrop: PropTypes.func,
  selectedDiory: PropTypes.object,
}

export default GridView
