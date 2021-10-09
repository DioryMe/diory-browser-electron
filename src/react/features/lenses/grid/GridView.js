import React from 'react'
import PropTypes from 'prop-types'

import { Pane } from 'evergreen-ui'
import BackgroundDiory from '../../../components/diories/BackgroundDiory'
import Diory from '../../../components/diories/Diory'
import LinkDioryContainer from '../../../components/LinkDioryContainer'

const GridView = ({ diory, diorys, reverseDiorys, parent, onDrop, onClick, onStoryClick }) => (
  <BackgroundDiory diory={diory} gradient onClick={onClick}>
    {reverseDiorys.map((linkDiory) => (
      <LinkDioryContainer linkDiory={linkDiory} onDrop={onDrop} onClick={onStoryClick}>
        <Diory
          key={linkDiory.id}
          diory={linkDiory}
          position="relative"
          border={linkDiory.id === parent.id && '5px solid red'}
          onClick={onStoryClick}
          aria-controls={`panel-${linkDiory.id}`}
        />
      </LinkDioryContainer>
    ))}
    <Pane height="75%" width="100%" />
    {diorys.map((linkDiory) => (
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
  onStoryClick: () => {},
  onDrop: () => {},
}

GridView.propTypes = {
  diory: PropTypes.object.isRequired,
  diorys: PropTypes.array.isRequired,
  parent: PropTypes.object.isRequired,
  reverseDiorys: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  onStoryClick: PropTypes.func,
  onDrop: PropTypes.func,
}

export default GridView
