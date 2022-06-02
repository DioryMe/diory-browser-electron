import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

import { Pane } from 'evergreen-ui'
import GridItem from './GridItem'
import DragDrop from './DragDrop'
import Diory from './diories/Diory'

const DiorysGrid = forwardRef(({ diorys, scrollIntoViewId, onDrop, onClick, ...props }, ref) => (
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
      <GridItem
        key={diory.id}
        flex="1 0 360px"
        height={240}
        padding={24}
        alignSelf="center"
        scrollIntoView={diory.id === scrollIntoViewId}
      >
        <DragDrop id={diory.id} onDrop={onDrop} onClick={onClick}>
          <Diory
            diory={diory}
            onClick={onClick}
            elevation={2}
            aria-controls={`panel-${diory.id}`}
          />
        </DragDrop>
      </GridItem>
    ))}
  </Pane>
))

DiorysGrid.propTypes = {
  diorys: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  scrollIntoViewId: PropTypes.string.isRequired,
}

export default DiorysGrid
