import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import GridItem from '../GridItem'
import DragDrop from '../DragDrop'
import Diory from './Diory'

const DiorysGrid = forwardRef(
  (
    {
      background,
      diorys = [],
      itemStyle,
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
        {background && (
          <DragDrop diory={background} onDrop={onBackgroundDrop} onClick={onBackgroundClick} />
        )}
      </Pane>
      {diorys.map((diory) => (
        <GridItem
          key={diory.key}
          flex="1 1 360px"
          height={240}
          margin={24}
          alignSelf="center"
          scrollIntoView={diory.key === scrollIntoViewId}
          {...itemStyle}
        >
          <DragDrop diory={diory} onDrop={onDrop}>
            <Diory diory={diory} onClick={onClick} aria-controls={`panel-${diory.id}`} />
          </DragDrop>
        </GridItem>
      ))}
    </Pane>
  )
)

DiorysGrid.propTypes = {
  background: PropTypes.object,
  diorys: PropTypes.array,
  itemStyle: PropTypes.object,
  scrollIntoViewId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onBackgroundClick: PropTypes.func,
  onBackgroundDrop: PropTypes.func,
}

export default DiorysGrid
