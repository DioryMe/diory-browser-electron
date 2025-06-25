import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import DiorysGrid from '../../../components/diories/DiorysGrid'
import { MenuItem } from '../../../components/MenuItem'
import Fullscreen from '../../../components/Fullscreen'

const itemStyle = {
  height: 120,
  minWidth: 120,
  maxWidth: 282,
  margin: 24,
}

const HandView = ({
  story,
  memories,
  scrollIntoViewId,
  onClick,
  onClear,
  onDrop,
  onBackgroundDrop,
}) => {
  const handRef = useRef()
  return (
    <Fullscreen display="flex" flexDirection="column">
      <DiorysGrid
        ref={handRef}
        background={story}
        diorys={memories}
        scrollIntoViewId={scrollIntoViewId}
        onClick={onClick}
        onDrop={onDrop}
        onBackgroundDrop={onBackgroundDrop}
        itemStyle={itemStyle}
        flex="1"
      />
      <Pane display="flex">
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
  story: PropTypes.object.isRequired,
  memories: PropTypes.array.isRequired,
  scrollIntoViewId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onBackgroundDrop: PropTypes.func.isRequired,
}

export { HandView }
