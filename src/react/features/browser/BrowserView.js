import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Box from 'ui-box'

import { useDiograph } from '../diograph/useDiograph'

import BackgroundDiory from '../../components/diories/BackgroundDiory'
import ScrollBackground from '../../components/ScrollBackground'
import DragDropBackground from '../../components/DragDropBackground'
import DiorysGrid from '../../components/DiorysGrid'
import ScrollVertically from '../../components/ScrollVertically'
import Content from '../content/Content'

const textStyle = {
  color: 'rgba(255,255,255,0.7)',
  fontSize: '24px',
  fontWeight: 'bold',
  paddingY: '24px',
  paddingX: '48px',
}

const contentStyle = {
  position: 'relative',
  width: '100%',
  height: '100%',
  margin: '0 48px',
  backgroundPosition: 'top',
}

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
  const contextRef = useRef()
  const storyRef = useRef()
  const memoryRef = useRef()

  useScrollToTopOnStoryChange(storyRef)

  return (
    <>
      <BackgroundDiory diory={story} />
      {!!contexts.length && (
        <ScrollVertically
          data-testid="navigate-up"
          initialRef={storyRef}
          scrolledRef={contextRef}
          initialDirection="up"
          top={0}
        />
      )}
      <ScrollBackground>
        <DiorysGrid ref={contextRef} diorys={contexts} onDrop={onDrop} onClick={onMemoryClick} />
        <DragDropBackground
          ref={storyRef}
          position="relative"
          width="100%"
          height="unset"
          onClick={() => onStoryClick({ diory: story })}
          diory={story}
          onDrop={onDrop}
          data-testid="story"
        >
          <Box {...textStyle}>{story.text || story.date}</Box>
        </DragDropBackground>
        <Content diory={story} style={contentStyle} />
        <DiorysGrid
          ref={memoryRef}
          diorys={memories}
          scrollIntoViewId={scrollIntoViewId}
          onDrop={onDrop}
          onClick={onMemoryClick}
        />
        <Box height="90%" position="relative" width="100%" />
      </ScrollBackground>
      {!!memories.length && (
        <ScrollVertically
          data-testid="navigate-down"
          initialRef={storyRef}
          scrolledRef={memoryRef}
          initialDirection="down"
          bottom={0}
        />
      )}
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
