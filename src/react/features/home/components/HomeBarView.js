import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import { MenuItem } from '../../../components/MenuItem'
import DragDrop from '../../../components/DragDrop'

const HomeBarView = ({ story, memories = [], onClick, onBackgroundDrop, onLeaveHome }) => (
  <>
    <Pane position="absolute" width="100%" height="100%" margin={0} zIndex={0}>
      <DragDrop diory={story} onDrop={onBackgroundDrop} />
    </Pane>
    <Pane flex={1} display="flex" flexDirection="column" justifyContent="space-between">
      <Pane paddingLeft={10} flex={1}>
        {memories.map((memory) => (
          <MenuItem key={memory.id} diory={memory} onClick={onClick} />
        ))}
      </Pane>

      <Pane paddingLeft={10}>
        <MenuItem diory={{ icon: 'log-out' }} onClick={onLeaveHome} fontWeight="bold" />
      </Pane>
    </Pane>
  </>
)

HomeBarView.propTypes = {
  story: PropTypes.object,
  memories: PropTypes.array,
  onClick: PropTypes.func,
  onBackgroundDrop: PropTypes.func,
}

export { HomeBarView }
