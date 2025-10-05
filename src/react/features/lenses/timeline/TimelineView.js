import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import Fullscreen from '../../../components/Fullscreen'
import DiorysGrid from '../../../components/diories/DiorysGrid'
import Diory from '../../../components/diories/Diory'
import { TimelineTitles } from './TimelineTitles'

const getPeriodStyle = (isSelected) => ({
  flex: '0 0 100px',
  height: 60,
  margin: 4,
  ...(isSelected && { border: '2px solid grey' }),
  text: {
    fontSize: 12,
    padding: 4,
  },
})

const TimelineView = ({
  titles = [],
  periods = [],
  memories,
  scrollIntoViewId,
  onPeriodClick,
  onMemoryClick,
  onDrop,
}) => {
  const handRef = useRef()
  return (
    <Pane height="100%" display="flex" flexDirection="column">
      <Pane position="relative" flex={1}>
        <Fullscreen>
          <Pane position="relative" display="flex" flexWrap="wrap" padding={4}>
            <TimelineTitles titles={titles} onClick={onPeriodClick} />
            {periods.map(({ diory, isSelected }) => (
              <Diory
                key={diory.id}
                diory={{ ...diory, style: getPeriodStyle(isSelected) }}
                onClick={onPeriodClick}
              />
            ))}
          </Pane>
          <DiorysGrid
            ref={handRef}
            diorys={memories}
            scrollIntoViewId={scrollIntoViewId}
            onClick={onMemoryClick}
            onDrop={onDrop}
          />
        </Fullscreen>
      </Pane>
    </Pane>
  )
}

TimelineView.propTypes = {
  titles: PropTypes.array,
  periods: PropTypes.array,
  memories: PropTypes.array.isRequired,
  scrollIntoViewId: PropTypes.string,
  onPeriodClick: PropTypes.func.isRequired,
  onMemoryClick: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
}

export { TimelineView }
