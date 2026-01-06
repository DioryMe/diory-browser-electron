import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import { MenuItem } from '../../../components/menu/MenuItem'
import DragDrop from '../../../components/DragDrop'
import { MenuTitle } from '../../../components/menu/MenuTitle'

const FavoritesView = ({ story, memories = [], onClick, onBackgroundDrop }) => (
  <>
    <Pane position="absolute" width="100%" height="100%" margin={0} zIndex={0}>
      <DragDrop diory={story} onDrop={onBackgroundDrop} />
    </Pane>
    <MenuTitle diory={story} onClick={onClick} />
    <Pane flex={1}>
      {memories.map((memory) => (
        <MenuItem key={memory.id} diory={memory} onClick={onClick} />
      ))}
    </Pane>
  </>
)

FavoritesView.propTypes = {
  story: PropTypes.object.isRequired,
  memories: PropTypes.array,
  onClick: PropTypes.func,
  onBackgroundDrop: PropTypes.func,
}

export { FavoritesView }
