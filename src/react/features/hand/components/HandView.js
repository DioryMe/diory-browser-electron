import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import DiorysGrid from '../../../components/diories/DiorysGrid'
import { MenuItem } from '../../../components/MenuItem'
import { SideBarTitle } from '../../sideBar/components/SideBarTitle'

const scaleContainer = {
  transformOrigin: 'top left',
  transform: 'scale(0.5)',
  width: '200%',
  height: '200%',
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
    <>
      <Pane display="flex" flexDirection="row">
        <SideBarTitle diory={story} onClick={onClick} />
        <MenuItem marginTop={4} marginBottom={4} onClick={onClear}>
          {memories.length ? ' Clear' : ''}
        </MenuItem>
      </Pane>
      <Pane height="100%">
        <DiorysGrid
          ref={handRef}
          background={story}
          diorys={memories}
          scrollIntoViewId={scrollIntoViewId}
          onClick={onClick}
          onDrop={onDrop}
          onBackgroundDrop={onBackgroundDrop}
          {...scaleContainer}
        />
      </Pane>
    </>
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
