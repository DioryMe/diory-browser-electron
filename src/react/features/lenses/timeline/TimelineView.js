import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import { SideBarTitle } from '../../sideBar/components/SideBarTitle'
import Fullscreen from '../../../components/Fullscreen'
import DiorysGrid from '../../../components/diories/DiorysGrid'

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
  titles,
  periods,
  memories,
  scrollIntoViewId,
  onClick,
  onDrop,
  onPeriodClick,
}) => {
  const handRef = useRef()
  return (
    <>
      <Pane display="flex" flexDirection="row" flexWrap="wrap" paddingLeft={14}>
        {titles.map((title) => (
          <SideBarTitle key={title.id} {...title} onClick={onPeriodClick} />
        ))}
      </Pane>
      <Pane position="relative" flex={0} display="flex" flexWrap="wrap" paddingLeft={14}>
        {periods.map((period) => (
          <SideBarTitle key={period.id} {...period} onClick={onPeriodClick} />
        ))}
      </Pane>

      <Pane position="relative" flex={1}>
        <Fullscreen>
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
    </>
  )
}

TimelineView.propTypes = {
  titles: PropTypes.array.isRequired,
  periods: PropTypes.array.isRequired,
  memories: PropTypes.array.isRequired,
  scrollIntoViewId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onPeriodClick: PropTypes.func.isRequired,
}

export { TimelineView }
