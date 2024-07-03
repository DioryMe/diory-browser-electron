import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import GridItem from './GridItem'
import DragDrop from './DragDrop'
import Diory from './diories/Diory'

const DiorysGrid = forwardRef(
  (
    {
      background,
      diorys,
      scrollIntoViewId,
      onClick,
      onDrop,
      onBackgroundClick,
      onBackgroundDrop,
      ...props
    },
    ref
  ) => (
    <Pane
      ref={ref}
      position="relative"
      width="100%"
      display="flex"
      flexWrap="wrap"
      alignContent="flex-start"
      paddingBottom={264}
      {...props}
    >
      <Pane position="absolute" width="100%" height="100%" margin={0} marginBottom={-264}>
        <DragDrop diory={background} onDrop={onBackgroundDrop} onClick={onBackgroundClick} />
      </Pane>
      {diorys.map((diory) => (
        <GridItem
          key={diory.id}
          flex="1 1 360px"
          height={240}
          margin={24}
          alignSelf="center"
          scrollIntoView={diory.id === scrollIntoViewId}
        >
          <DragDrop diory={diory} onDrop={onDrop}>
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
  )
)

DiorysGrid.propTypes = {
  background: PropTypes.object.isRequired,
  diorys: PropTypes.array.isRequired,
  scrollIntoViewId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onBackgroundClick: PropTypes.func,
  onBackgroundDrop: PropTypes.func,
}

export default DiorysGrid
