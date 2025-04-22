import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import { SideBarTitle } from '../../sideBar/components/SideBarTitle'
import Fullscreen from '../../../components/Fullscreen'
import DiorysGrid from '../../../components/diories/DiorysGrid'

const itemStyle = {
  flex: "1 1 120px",
  height: 80,
  margin: 8,
}
const dioryStyle = {
  text: {
    padding: '4px'
  },
  links: {
    padding: '4px',
  }
}

const TimelineView = ({
  story,
  memories,
  scrollIntoViewId,
  onClick,
  onDrop,
}) => {
  const handRef = useRef()
  return (
    <>
      <Pane display="flex" flexDirection="row" paddingLeft={14}>
        <SideBarTitle diory={story} onClick={onClick} />
      </Pane>
      <Pane position="relative" flex={1}>
        <Fullscreen>
          <DiorysGrid
            ref={handRef}
            background={story}
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
  story: PropTypes.object.isRequired,
  memories: PropTypes.array.isRequired,
  scrollIntoViewId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
}

export { TimelineView }
