import PropTypes from 'prop-types'
import React from 'react'

import BackgroundDiory from './diories/BackgroundDiory'
import Diory from './diories/Diory'

const Grid = ({ diory, diorys, onClick }) => (
  <BackgroundDiory diory={diory} gradient onClick={onClick}>
    {diorys.map((linkDiory) => (
      <Diory
        key={linkDiory.id}
        diory={linkDiory}
        onClick={onClick}
        flex="1 0 360px"
        height={240}
        padding={24}
        elevation={2}
        alignSelf="center"
        color="white"
        fontWeight="bold"
        aria-controls={`panel-${linkDiory.id}`}
      />
    ))}
  </BackgroundDiory>
)

Grid.defaultProps = {
  onClick: () => {},
}

Grid.propTypes = {
  diory: PropTypes.object.isRequired,
  diorys: PropTypes.array.isRequired,
  onClick: PropTypes.func,
}

export default Grid
