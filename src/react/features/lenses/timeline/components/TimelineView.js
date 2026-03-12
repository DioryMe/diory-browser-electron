import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import Fullscreen from '../../../../components/Fullscreen'
import DiorysGrid from '../../../../components/diories/DiorysGrid'
import Diory from '../../../../components/diories/Diory'
import { TimelineTitles } from './TimelineTitles'
import BackgroundDiory from '../../../../components/diories/BackgroundDiory'
import { MenuItem } from '../../../../components/menu/MenuItem'
import DragDrop from '../../../../components/DragDrop'

const periodStyle = {
  flex: '0 0 60px',
  height: 60,
  margin: 4,
  background: 'rgba(255,255,255,0.1)',
  text: {
    fontSize: 12,
    padding: 4,
  },
}

const TimelineView = ({
  titles = [],
  periods = [],
  periodStory,
  periodMemories,
  periodDiories,
  onPeriodClick,
  onMemoryClick,
  onSelect,
  onDrop,
  onBackgroundDrop,
}) => {
  const handRef = useRef()
  return (
    <Pane height="100%" display="flex" flexDirection="column">
      <Pane position="relative" flex={1}>
        <Fullscreen>
          <Pane position="relative" display="flex" flexWrap="wrap" padding={4} backgroundColor="#222">
            <TimelineTitles parents={titles} childs={periods} onClick={onPeriodClick} />
          </Pane>
          {periodStory && <BackgroundDiory diory={periodStory} />}
          <DiorysGrid
            background={periodStory}
            diorys={periodMemories}
            onClick={onMemoryClick}
            onDrop={onDrop}
            onSelect={onSelect}
            onBackgroundClick={onMemoryClick}
            onBackgroundDrop={onBackgroundDrop}
          />
          {!!periodDiories.length && <MenuItem diory={{ text: 'Period diories' }} />}
          <Pane position="relative" display="flex" flexWrap="wrap" padding={4}>
            {periodDiories.map((diory) => (
              <Pane key={diory.id} {...periodStyle} >
                <DragDrop diory={diory} onDrop={onDrop}>
                  <Diory diory={diory} onClick={onMemoryClick} onSelect={onSelect} />
                </DragDrop>
              </Pane>
            ))}
          </Pane>
        </Fullscreen>
      </Pane>
    </Pane>
  )
}

TimelineView.propTypes = {
  titles: PropTypes.array,
  periods: PropTypes.array,
  periodStory: PropTypes.object,
  periodMemories: PropTypes.array.isRequired,
  periodDiories: PropTypes.array.isRequired,
  onPeriodClick: PropTypes.func.isRequired,
  onMemoryClick: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onBackgroundDrop: PropTypes.func.isRequired,
}

export { TimelineView }
