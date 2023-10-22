import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Box from 'ui-box'

import { useDiograph } from '../diograph/useDiograph'

import BackgroundDiory from '../../components/diories/BackgroundDiory'
import ScrollBackground from '../../components/ScrollBackground'
import DragDropBackground from '../../components/DragDropBackground'
import DiorysGrid from '../../components/DiorysGrid'
import Content from '../content/Content'

const useScrollToTopOnStoryChange = (elementRef) => {
  const { story } = useDiograph()
  useEffect(() => {
    elementRef.current.scrollIntoView()
  }, [elementRef, story.id])
}

const BrowserView = ({
  contexts,
  story,
  memories,
  scrollIntoViewId,
  onDrop,
  onStoryClick,
  onMemoryClick,
}) => {
  const storyRef = useRef()
  const memoryRef = useRef()

  useScrollToTopOnStoryChange(storyRef)

  return (
    <>
      <BackgroundDiory diory={story} />
      <ScrollBackground>
        <DragDropBackground
          ref={storyRef}
          position="relative"
          width="100%"
          height="unset"
          onClick={() => onStoryClick({ diory: story })}
          diory={story}
          onDrop={onDrop}
          data-testid="story"
        />
        <Content />
        <DiorysGrid
          ref={memoryRef}
          diorys={memories}
          scrollIntoViewId={scrollIntoViewId}
          onDrop={onDrop}
          onClick={onMemoryClick}
        />
        <Box height="90%" position="relative" width="100%" />
      </ScrollBackground>
    </>
  )
}

BrowserView.defaultProps = {
  onStoryClick: () => {},
  onMemoryClick: () => {},
  onDrop: () => {},
}

BrowserView.propTypes = {
  story: PropTypes.object.isRequired,
  contexts: PropTypes.array.isRequired,
  memories: PropTypes.array.isRequired,
  scrollIntoViewId: PropTypes.string,
  onStoryClick: PropTypes.func,
  onMemoryClick: PropTypes.func,
  onDrop: PropTypes.func,
}

export default BrowserView
