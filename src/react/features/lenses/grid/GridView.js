import React from 'react'
import PropTypes from 'prop-types'

import Background from '../../../components/Background'
import DataAwareDiory from '../../../components/diories/DataAwareDiory'
import Diory from '../../../components/diories/Diory'
import FocusDioryContainer from '../../../components/FocusDioryContainer'
import LinkDioryContainer from '../../../components/LinkDioryContainer'

const GridView = ({ diory, diorys, reverseDiorys = [], onDrop, onClick }) => (
  <Background>
    {reverseDiorys.map((linkDiory) => (
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
    <FocusDioryContainer
      diory={diory}
      onClick={onClick}
      onDrop={onDrop}
      style={{ flex: '1 0 100%', height: 480, padding: 24 }}
    >
      <DataAwareDiory diory={diory} />
    </FocusDioryContainer>
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
  </Background>
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
}

export default GridView
