import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Box from 'ui-box'

import { useDiograph } from '../diograph/useDiograph'

import BackgroundDiory from '../../components/diories/BackgroundDiory'
import DiorysGrid from '../../components/DiorysGrid'
import Content from '../content/Content'
import Fullscreen from '../../components/Fullscreen'

const useScrollToTopOnStoryChange = (elementRef) => {
  const { story } = useDiograph()
  useEffect(() => {
    elementRef.current.scrollIntoView()
  }, [elementRef, story.id])
}

const BrowserView = ({ story, memories, scrollIntoViewId, onDrop, onMemoryClick }) => {
  const storyRef = useRef()

  useScrollToTopOnStoryChange(storyRef)

  return (
    <>
      <BackgroundDiory diory={story} />
      <Fullscreen>
        <Content />
        <DiorysGrid
          ref={storyRef}
          background={story}
          diorys={memories}
          scrollIntoViewId={scrollIntoViewId}
          onClick={onMemoryClick}
          onDrop={onDrop}
          onBackgroundDrop={onDrop}
        />
        <Box position="relative" height="90%" width="100%" />
      </Fullscreen>
    </>
  )
}

BrowserView.defaultProps = {
  onMemoryClick: () => {},
  onDrop: () => {},
}

BrowserView.propTypes = {
  story: PropTypes.object.isRequired,
  memories: PropTypes.array.isRequired,
  scrollIntoViewId: PropTypes.string,
  onMemoryClick: PropTypes.func,
  onDrop: PropTypes.func,
}

export default BrowserView
