import React, { Fragment, useRef } from 'react'
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

const isLast = (index, length) => index === length - 1

const TimelineView = ({
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
      <Pane position="relative" flex={0} display="flex" flexWrap="wrap" paddingLeft={14} color="grey">
        {titles.map((title, index, array) => (
          <Fragment key={title.id}>
            <SidePanelTitle diory={title} onClick={onPeriodClick} />
            { !isLast(index, array.length) && <span>/</span> }
          </Fragment>
        ))}
      </Pane>

      <Pane position="relative" flex={1}>
        <Fullscreen>
          <Pane position="relative" flex={0} display="flex" flexWrap="wrap" padding={8}>
            {periods.map(({ id, text, image, amount, selected }) => (
              <Pane
                {...itemStyle}
                key={id}
                paddingBottom={24}
                border={selected ? '4px solid red' : ''}
                onClick={() => onPeriodClick({ diory: { id } })}
              >
                <SidePanelTitle diory={{ text }} amount={amount} />
                <Diory diory={{ id, image }} />
              </Pane>
            ))}
          </Pane>
          <DiorysGrid
            ref={handRef}
            diorys={memories.map((diory) => ({ ...diory, style: { ...dioryStyle, ...diory.style } }))}
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
  titles: PropTypes.array,
  periods: PropTypes.array,
  memories: PropTypes.array.isRequired,
  scrollIntoViewId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onPeriodClick: PropTypes.func.isRequired,
}

export { TimelineView }
