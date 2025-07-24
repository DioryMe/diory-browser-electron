import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import { SidePanelTitle } from '../../sidePanel/components/SidePanelTitle'
import Fullscreen from '../../../components/Fullscreen'
import DiorysGrid from '../../../components/diories/DiorysGrid'
import Diory from '../../../components/diories/Diory'

const itemStyle = {
  flex: '1 1 120px',
  height: 80,
  margin: 8,
}
const dioryStyle = {
  text: {
    padding: '4px',
  },
  links: {
    padding: '4px',
  },
}

const TimelineView = ({
  timeline,
  titles = [],
  periods = [],
  memories,
  scrollIntoViewId,
  onClick,
  onDrop,
  onPeriodClick,
}) => {
  const handRef = useRef()
  return (
    <Pane height="100%" display="flex" flexDirection="column">
      <Pane display="flex" flexDirection="row" flexWrap="wrap" paddingLeft={14}>
        <SidePanelTitle {...timeline} onClick={onPeriodClick} />
      </Pane>
      <Pane position="relative" flex={0} display="flex" flexWrap="wrap" paddingLeft={14}>
        {titles.map((title) => (
          <SidePanelTitle key={title.id} {...title} onClick={onPeriodClick} />
        ))}
      </Pane>

      <Pane position="relative" flex={1}>
        <Fullscreen>
          <Pane position="relative" flex={0} display="flex" flexWrap="wrap" padding={8}>
            {periods.map(({ id, label, image, amount }) => (
              <Pane
                {...itemStyle}
                paddingBottom={24}
                onClick={() => onPeriodClick({ diory: { id } })}
              >
                <SidePanelTitle text={label} amount={amount} />
                <Diory diory={{ id, image }} />
              </Pane>
            ))}
          </Pane>
          <DiorysGrid
            ref={handRef}
            diorys={memories.map((diory) => ({ ...diory, style: dioryStyle }))}
            padding={8}
            itemStyle={itemStyle}
            scrollIntoViewId={scrollIntoViewId}
            onClick={onClick}
            onDrop={onDrop}
          />
        </Fullscreen>
      </Pane>
    </Pane>
  )
}

TimelineView.propTypes = {
  timeline: PropTypes.object.isRequired,
  titles: PropTypes.array,
  periods: PropTypes.array,
  memories: PropTypes.array.isRequired,
  scrollIntoViewId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onPeriodClick: PropTypes.func.isRequired,
}

export { TimelineView }
