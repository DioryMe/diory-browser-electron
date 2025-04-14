import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Pane } from 'evergreen-ui'

import NavigationButton from '../NavigationButton'
import { MenuItem } from '../MenuItem'
import DragDrop from '../DragDrop'

const DiographLinks = ({ story, diorys = [], onClick, onBackgroundDrop }) => (
  <Menu appearance="minimal">
    <Pane position="absolute" width="100%" height="100%" margin={0} zIndex={0}>
      <DragDrop diory={story} onDrop={onBackgroundDrop} />
    </Pane>
    {diorys.map((diory) => (
      <MenuItem key={diory.id} onClick={() => onClick({ diory })}>
        {diory.text || diory.date || diory.id}
      </MenuItem>
    ))}
  </Menu>
)

DiographLinks.propTypes = {
  story: PropTypes.object,
  diorys: PropTypes.array,
  onClick: PropTypes.func,
}

export { DiographLinks }
