import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import Fullscreen from '../../../../components/Fullscreen'
import DiorysGrid from '../../../../components/diories/DiorysGrid'
import Diory from '../../../../components/diories/Diory'
import { TimelineTitles } from './TimelineTitles'
import BackgroundDiory from '../../../../components/diories/BackgroundDiory'
import { MenuItem } from '../../../../components/menu/MenuItem'

const periodStyle = {
  flex: '0 0 100px',
  height: 60,
  margin: 4,
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
}) => {
  const handRef = useRef()
  return (
    <Pane height="100%" display="flex" flexDirection="column">
      <Pane position="relative" flex={1}>
        { periodStory && <BackgroundDiory diory={periodStory} /> }
        <Fullscreen>
          <Pane position="relative" display="flex" flexWrap="wrap" padding={4}>
            <TimelineTitles titles={titles} onClick={onPeriodClick} />
            {periods.map((diory) => (
              <Diory
                key={diory.id}
                diory={{ ...diory, style: { ...periodStyle, ...diory.style } }}
                onClick={onPeriodClick}
              />
            ))}
          </Pane>
          {!!periodMemories.length && <MenuItem diory={{ text: 'Period memories' }}/>}
          <DiorysGrid
            ref={handRef}
            diorys={periodMemories}
            onClick={onMemoryClick}
            onSelect={onSelect}
            onDrop={onDrop}
          />
          {!!periodDiories.length && <MenuItem diory={{ text: 'Period diories' }}/>}
          <Pane position="relative" display="flex" flexWrap="wrap" padding={4}>
            {periodDiories.map((diory) => (
              <Diory
                key={diory.id}
                diory={{ ...diory, style: { ...periodStyle, ...diory.style } }}
                onClick={onMemoryClick}
                onSelect={onSelect}              />
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
  scrollIntoViewId: PropTypes.string,
  onPeriodClick: PropTypes.func.isRequired,
  onMemoryClick: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
}

export { TimelineView }
