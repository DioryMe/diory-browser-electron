import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

import { Pane } from 'evergreen-ui'
import DragDropDiory from './DragDropDiory'

const DiorysGrid = forwardRef(({ diorys, onDrop, onClick, ...props }, ref) => (
  <Pane
    ref={ref}
    position="relative"
    width="100%"
    display="flex"
    flexWrap="wrap"
    padding={24}
    alignContent="flex-start"
    {...props}
  >
    {diorys.map((diory) => (
      <DragDropDiory
        key={diory.id}
        diory={diory}
        onDrop={onDrop}
        onClick={onClick}
        flex="1 0 360px"
        height={240}
        padding={24}
        alignSelf="center"
      />
    ))}
  </Pane>
))

DiorysGrid.propTypes = {
  diorys: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
}

export default DiorysGrid
