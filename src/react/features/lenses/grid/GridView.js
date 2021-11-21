import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { useDiograph } from '../../diograph/useDiograph'

import ScrollBackground from '../../../components/ScrollBackground'
import DiorysGrid from '../../../components/DiorysGrid'
import ScrollVertically from '../../../components/ScrollVertically'
import DataAwareDiory from '../../../components/diories/DataAwareDiory'
import DragDropBackground from '../../../components/DragDropBackground'
import FullscreenBackground from '../../../components/FullscreenBackground'

const useScrollToTopOnStoryChange = (elementRef) => {
  const { story } = useDiograph()
  useEffect(() => {
    elementRef.current.scrollIntoView()
  }, [elementRef, story])
}

const GridView = ({ playRef, story, memories, page, onDrop, onClick }) => {
  const storyRef = useRef()
  const memoryRef = useRef()

  useScrollToTopOnStoryChange(storyRef)

  return (
    <>
      <FullscreenBackground>
        <DataAwareDiory page={page} playRef={playRef} diory={story} />
      </FullscreenBackground>
      <ScrollBackground>
        <DragDropBackground
          ref={storyRef}
          position="relative"
          width="100%"
          height="80vh"
          onClick={() => onClick({ diory: story })}
          diory={story}
          onDrop={onDrop}
          data-testid="story"
        />
        <DiorysGrid ref={memoryRef} diorys={memories} onDrop={onDrop} onClick={onClick} />
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
  onClick: () => {},
  onDrop: () => {},
}

GridView.propTypes = {
  playRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
  page: PropTypes.shape({
    ref: PropTypes.func.isRequired,
    number: PropTypes.number.isRequired,
  }).isRequired,
  story: PropTypes.object.isRequired,
  memories: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  onDrop: PropTypes.func,
}

export default GridView
