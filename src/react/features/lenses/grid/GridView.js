import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import Background from '../../../components/Background'
import DiorysGrid from '../../../components/DiorysGrid'
import ScrollVertically from '../../../components/ScrollVertically'
import Fullscreen from '../../../components/Fullscreen'
import DataAwareDiory from '../../../components/diories/DataAwareDiory'
import DragDropBackground from '../../../components/DragDropBackground'

const GridView = ({ playRef, story, memories, page, onDrop, onClick }) => {
  const storyRef = useRef()
  const memoryRef = useRef()

  return (
    <Background>
      <Fullscreen marginTop={48}>
        <DragDropBackground onClick={() => onClick({ diory: story })} diory={story} onDrop={onDrop}>
          <DataAwareDiory page={page} playRef={playRef} diory={story} />
        </DragDropBackground>
      </Fullscreen>
      <Pane ref={storyRef} width="100%" />
      <DiorysGrid
        ref={memoryRef}
        diorys={memories}
        onDrop={onDrop}
        onClick={onClick}
        marginTop="80vh"
      />
      {!!memories.length && (
        <ScrollVertically
          data-testid="navigate-down"
          initialRef={storyRef}
          scrolledRef={memoryRef}
          initialDirection="up"
          bottom={0}
        />
      )}
    </Background>
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
