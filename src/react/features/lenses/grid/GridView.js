import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { useDiograph } from '../../diograph/useDiograph'

import BackgroundDiory from '../../../components/diories/BackgroundDiory'
import Content from '../../content/Content'
import ScrollBackground from '../../../components/ScrollBackground'
import DragDropBackground from '../../../components/DragDropBackground'
import DiorysGrid from '../../../components/DiorysGrid'
import ScrollVertically from '../../../components/ScrollVertically'

const useScrollToTopOnStoryChange = (elementRef) => {
  const { story } = useDiograph()
  useEffect(() => {
    elementRef.current.scrollIntoView()
  }, [elementRef, story])
}

const GridView = ({ story, memories, onDrop, onStoryClick, onMemoryClick }) => {
  const storyRef = useRef()
  const memoryRef = useRef()

  useScrollToTopOnStoryChange(storyRef)

  return (
    <>
      <BackgroundDiory diory={story} />
      <Content diory={story} />
      <ScrollBackground>
        <DragDropBackground
          ref={storyRef}
          position="relative"
          width="100%"
          height="80vh"
          onClick={() => onStoryClick({ diory: story })}
          diory={story}
          onDrop={onDrop}
          data-testid="story"
        />
        <DiorysGrid ref={memoryRef} diorys={memories} onDrop={onDrop} onClick={onMemoryClick} />
        {!!memories.length && (
          <ScrollVertically
            data-testid="navigate-down"
            initialRef={storyRef}
            scrolledRef={memoryRef}
            initialDirection="up"
            bottom={0}
          />
        )}
      </ScrollBackground>
    </>
  )
}

GridView.defaultProps = {
  onStoryClick: () => {},
  onMemoryClick: () => {},
  onDrop: () => {},
}

GridView.propTypes = {
  story: PropTypes.object.isRequired,
  memories: PropTypes.array.isRequired,
  onStoryClick: PropTypes.func,
  onMemoryClick: PropTypes.func,
  onDrop: PropTypes.func,
}

export default GridView
