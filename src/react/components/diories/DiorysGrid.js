import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import GridItem from '../GridItem'
import DragDrop from '../DragDrop'
import Diory from './Diory'
import Fullscreen from '../Fullscreen'

const horizontalStyle = {
  flexDirection: 'column',
}

const verticalStyle = {
  width: '100%',
}

const DiorysGrid = forwardRef(
  (
    {
      background,
      diorys = [],
      itemStyle = {},
      scrollIntoViewId,
      onClick,
      onDrop,
      onBackgroundClick,
      onBackgroundDrop,
      onSelect,
      isHorizontal,
      ...props
    },
    ref
  ) => (
    <Pane
      ref={ref}
      position="relative"
      padding={24}
      display="flex"
      flexWrap="wrap"
      alignContent="flex-start"
      {...(isHorizontal ? horizontalStyle : verticalStyle)}
      {...props}
    >
      <Pane position="absolute" width="100%" height="100%" margin={-itemStyle.margin || -24}>
        {background && (
          <DragDrop diory={background} onDrop={onBackgroundDrop} onClick={onBackgroundClick} />
        )}
      </Pane>
      {diorys.map((diory) => (
        <GridItem
          key={diory.key}
          height={240}
          margin={24}
          alignSelf="center"
          scrollIntoView={diory.key === scrollIntoViewId}
          {...itemStyle}
        >
          <DragDrop diory={diory} onDrop={onDrop}>
            <Diory
              diory={diory}
              isGridImage
              onClick={onClick}
              onSelect={onSelect}
              aria-controls={`panel-${diory.id}`}
            />
          </DragDrop>
        </GridItem>
      ))}
    </Pane>
  )
)

DiorysGrid.propTypes = {
  background: PropTypes.object,
  diorys: PropTypes.array,
  isHorizontal: PropTypes.bool,
  itemStyle: PropTypes.object,
  scrollIntoViewId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  onBackgroundClick: PropTypes.func,
  onBackgroundDrop: PropTypes.func,
}

export default DiorysGrid
