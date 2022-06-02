import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import BackgroundDiory from '../../../components/diories/BackgroundDiory'
import Content from '../../content/Content'
import ScrollBackground from '../../../components/ScrollBackground'
import DragDropBackground from '../../../components/DragDropBackground'
import DiorysGrid from '../../../components/DiorysGrid'
import ScrollVertically from '../../../components/ScrollVertically'

const GridView = ({ story, memories, onDrop, onStoryClick, onMemoryClick }) =>
  story && (
    <>
      <BackgroundDiory diory={story} />
      <Content diory={story} />
      <ScrollBackground>
        <DragDropBackground
          position="relative"
          width="100%"
          height="80vh"
          onClick={() => onStoryClick({ diory: story })}
          diory={story}
          onDrop={onDrop}
          data-testid="story"
        />
        <DiorysGrid diorys={memories} onDrop={onDrop} onClick={onMemoryClick} />
        {!!memories.length && (
          <ScrollVertically data-testid="navigate-down" initialDirection="up" bottom={0} />
        )}
      </ScrollBackground>
    </>
  )

GridView.propTypes = {
  story: PropTypes.object.isRequired,
  memories: PropTypes.array.isRequired,
  onStoryClick: () => {},
  onMemoryClick: () => {},
  onDrop: () => {},
}

export default GridView
