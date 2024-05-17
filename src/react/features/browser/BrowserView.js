import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

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

const BrowserView = ({
  story,
  memories,
  scrollIntoViewId,
  onDrop,
  onStoryClick,
  onMemoryClick,
}) => {
  const storyRef = useRef()

  useScrollToTopOnStoryChange(storyRef)

  return (
    <>
      <BackgroundDiory diory={story} />
      <Fullscreen>
        <div ref={storyRef} />
        <Content />
        <DiorysGrid
          background={story}
          diorys={memories}
          scrollIntoViewId={scrollIntoViewId}
          onClick={onMemoryClick}
          onDrop={onDrop}
          onBackgroundClick={onStoryClick}
          onBackgroundDrop={onDrop}
        />
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
  onStoryClick: PropTypes.func,
  onMemoryClick: PropTypes.func,
  onDrop: PropTypes.func,
}

export default BrowserView
