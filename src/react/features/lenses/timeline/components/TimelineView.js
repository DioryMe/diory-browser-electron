import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import Fullscreen from '../../../../components/Fullscreen'
import DiorysGrid from '../../../../components/diories/DiorysGrid'
import Diory from '../../../../components/diories/Diory'
import { TimelineTitles } from './TimelineTitles'
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
  memories,
  scrollIntoViewId,
  viewAll,
  onPeriodClick,
  onMemoryClick,
  onSelect,
  onDrop,
  onViewAllClick,
}) => {
  const handRef = useRef()
  return (
    <Pane height="100%" display="flex" flexDirection="column">
      <Pane position="relative" flex={1}>
        <Fullscreen>
          <Pane position="relative" display="flex" flexWrap="wrap" padding={4}>
            <TimelineTitles titles={titles} onClick={onPeriodClick} />
            {periods.map(({ diory }) => (
              <Diory
                key={diory.id}
                diory={{ ...diory, style: { ...periodStyle, ...diory.style } }}
                onClick={onPeriodClick}
              />
            ))}
          </Pane>
          <MenuItem diory={viewAll} onClick={onViewAllClick} />
          <DiorysGrid
            ref={handRef}
            diorys={memories}
            scrollIntoViewId={scrollIntoViewId}
            onClick={onMemoryClick}
            onSelect={onSelect}
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
  viewAll: PropTypes.object,
  scrollIntoViewId: PropTypes.string,
  onPeriodClick: PropTypes.func.isRequired,
  onMemoryClick: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onViewAllClick: PropTypes.func.isRequired,
}

export { TimelineView }
