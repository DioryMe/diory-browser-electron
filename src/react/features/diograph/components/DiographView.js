import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import BackgroundDiory from '../../../components/diories/BackgroundDiory'
import DiorysGrid from '../../../components/diories/DiorysGrid'
import Content from '../../content/Content'
import Fullscreen from '../../../components/Fullscreen'

// const useScrollToTopOnStoryChange = (story, elementRef) => {
//   useEffect(() => {
//     if (elementRef.current) elementRef.current.scrollIntoView()
//   }, [elementRef, story])
// }

const DiographView = ({
  story,
  memories,
  scrollIntoViewId,
  onDrop,
  onStoryClick,
  onMemoryClick,
  onSelect,
}) => {
  const storyRef = useRef()

  // useScrollToTopOnStoryChange(story, storyRef)

  return story ? (
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
          onSelect={onSelect}
          onBackgroundClick={onStoryClick}
          onBackgroundDrop={onDrop}
        />
      </Fullscreen>
    </>
  ) : null
}

DiographView.defaultProps = {
  onMemoryClick: () => {},
  onDrop: () => {},
}

DiographView.propTypes = {
  story: PropTypes.object,
  memories: PropTypes.array,
  scrollIntoViewId: PropTypes.string,
  onStoryClick: PropTypes.func,
  onMemoryClick: PropTypes.func,
  onSelect: PropTypes.func,
  onDrop: PropTypes.func,
}

export default DiographView
