import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import DiorysGrid from '../../../components/diories/DiorysGrid'
import { MenuItem } from '../../../components/menu/MenuItem'
import Fullscreen from '../../../components/Fullscreen'

const itemStyle = {
  height: 'calc(100% - 24px)',
  margin: 12,
}

const HandView = ({
  story,
  memories,
  scrollIntoViewId,
  onClick,
  onSelect,
  onClear,
  onDrop,
  onBackgroundDrop,
}) => {
  const handRef = useRef()
  return (
    <Fullscreen display="flex" flexDirection="column" justifyContent="space-between">
      <DiorysGrid
        ref={handRef}
        isHorizontal
        background={story}
        diorys={memories}
        scrollIntoViewId={scrollIntoViewId}
        onClick={onClick}
        onSelect={onSelect}
        onDrop={onDrop}
        onBackgroundDrop={onBackgroundDrop}
        overflowX="auto"
        padding={12}
        itemStyle={itemStyle}
        height="100%"
      />
      <Pane display="flex" justifyContent="center">
        {memories.length ? (
          <MenuItem
            diory={{ text: 'CLEAR HAND' }}
            marginTop={4}
            marginBottom={4}
            onClick={onClear}
          />
        ) : (
          <MenuItem diory={{ text: 'Drag diories to hand' }} marginTop={4} marginBottom={4} />
        )}
      </Pane>
    </Fullscreen>
  )
}

HandView.propTypes = {
  story: PropTypes.object,
  memories: PropTypes.array.isRequired,
  scrollIntoViewId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onBackgroundDrop: PropTypes.func.isRequired,
}

export { HandView }
