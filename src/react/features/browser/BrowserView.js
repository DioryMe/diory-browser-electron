import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Box from 'ui-box'

import { useDiograph } from '../diograph/useDiograph'

import BackgroundDiory from '../../components/diories/BackgroundDiory'
import ScrollBackground from '../../components/ScrollBackground'
import DiorysGrid from '../../components/DiorysGrid'
import Content from '../content/Content'

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
      <ScrollBackground>
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
        <Box height="90%" position="relative" width="100%" />
      </ScrollBackground>
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
