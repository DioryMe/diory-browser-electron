import React from 'react'
import PropTypes from 'prop-types'

import BackgroundDiory from '../../../components/diories/BackgroundDiory'
import DataAwareDiory from '../../../components/diories/DataAwareDiory'
import Diory from '../../../components/diories/Diory'
import FocusDioryContainer from '../../../components/FocusDioryContainer'
import LinkDioryContainer from '../../../components/LinkDioryContainer'

const GridView = ({ story, memories, onDrop, onClick }) => (
  <BackgroundDiory
    diory={{ id: story.id, image: story.image, text: story.text }}
    gradient
    onClick={onClick}
  >
    <FocusDioryContainer
      diory={story}
      onClick={onClick}
      onDrop={onDrop}
      style={{ flex: '1 0 100%', height: 480, padding: 24 }}
    >
      <DataAwareDiory diory={story} />
    </FocusDioryContainer>
    {memories.map((linkDiory) => (
      <LinkDioryContainer linkDiory={linkDiory} onDrop={onDrop} onClick={onClick}>
        <Diory
          key={linkDiory.id}
          diory={linkDiory}
          onClick={onClick}
          elevation={2}
          aria-controls={`panel-${linkDiory.id}`}
        />
      </LinkDioryContainer>
    ))}
  </BackgroundDiory>
)

GridView.defaultProps = {
  onClick: () => {},
  onDrop: () => {},
}

GridView.propTypes = {
  story: PropTypes.object.isRequired,
  memories: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  onDrop: PropTypes.func,
}

export default GridView
