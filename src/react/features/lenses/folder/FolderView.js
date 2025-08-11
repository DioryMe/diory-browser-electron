import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import { SidePanelTitle } from '../../sidePanel/components/SidePanelTitle'
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

const FolderView = ({ header, titles = [], memories, scrollIntoViewId, onClick }) => {
  const handRef = useRef()
  return (
    <Pane height="100%" display="flex" flexDirection="column">
      <Pane display="flex" flexDirection="row" flexWrap="wrap" paddingLeft={14}>
        <SidePanelTitle diory={header} onClick={onClick} />
      </Pane>
      <Pane position="relative" flex={0} display="flex" flexWrap="wrap" paddingLeft={14}>
        {titles.map((title) => (
          <SidePanelTitle key={title.id} diory={title} onClick={onClick} />
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
          />
        </Fullscreen>
      </Pane>
    </Pane>
  )
}

FolderView.propTypes = {
  header: PropTypes.object.isRequired,
  titles: PropTypes.array,
  memories: PropTypes.array.isRequired,
  scrollIntoViewId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

export { FolderView }
