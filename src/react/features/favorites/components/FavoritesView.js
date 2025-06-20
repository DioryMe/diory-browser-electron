import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Pane } from 'evergreen-ui'

import { MenuItem } from '../../../components/MenuItem'
import DragDrop from '../../../components/DragDrop'
import { SidePanelTitle } from '../../sidePanel/components/SidePanelTitle'

const FavoritesView = ({ story, memories = [], onClick, onBackgroundDrop }) => (
  <Menu>
    <Pane position="absolute" width="100%" height="100%" margin={0} zIndex={0}>
      <DragDrop diory={story} onDrop={onBackgroundDrop} />
    </Pane>
    <Pane paddingLeft={10}>
      <SidePanelTitle {...story} onClick={onClick} />
      {memories.map((diory) => (
        <MenuItem key={diory.id} {...diory} onClick={() => onClick({ diory })} />
      ))}
    </Pane>
  </Menu>
)

FavoritesView.propTypes = {
  story: PropTypes.object,
  memories: PropTypes.array,
  onClick: PropTypes.func,
  onBackgroundDrop: PropTypes.func,
}

export { FavoritesView }
