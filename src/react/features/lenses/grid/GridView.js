import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import { Pane } from 'evergreen-ui'
import Background from '../../../components/Background'
import DiorysGrid from '../../../components/DiorysGrid'
import DragDropDiory from '../../../components/DragDropDiory'
import ScrollUpAndDown from '../../../components/ScrollUpAndDown'
import Fullscreen from '../../../components/Fullscreen'
import DataAwareDiory from '../../../components/diories/DataAwareDiory'

const GridView = ({
  playRef,
  context,
  contexts,
  story,
  memories,
  page,
  onDrop,
  onClick,
  onContextClick,
}) => {
  const contextRef = useRef()
  const storyRef = useRef()
  const memoryRef = useRef()

  const otherContexts = contexts.filter(({ id }) => !context || id !== context.id)
  return (
    <Background>
      <Fullscreen marginTop={48} zIndex={-1}>
        <DataAwareDiory page={page} playRef={playRef} diory={story} />
      </Fullscreen>
      {!!contexts.length && (
        <ScrollUpAndDown
          initialRef={storyRef}
          scrolledRef={contextRef}
          initialDirection="down"
          location="top"
          top={48}
        />
      )}
      <DiorysGrid
        ref={contextRef}
        diorys={otherContexts}
        onDrop={onDrop}
        onClick={onContextClick}
      />
      {context && (
        <DragDropDiory
          diory={context}
          onClick={onContextClick}
          onDrop={onDrop}
          flex="1 0 360px"
          margin={24}
          padding={24}
          height={240}
          alignSelf="center"
        />
      )}
      <Pane
        ref={storyRef}
        id={`background-${story.id}`}
        position="relative"
        height="80%"
        width="100%"
        onClick={() => onClick({ story })}
      />
      <DiorysGrid ref={memoryRef} diorys={memories} onDrop={onDrop} onClick={onClick} />
      {!!memories.length && (
        <ScrollUpAndDown
          initialRef={storyRef}
          scrolledRef={memoryRef}
          initialDirection="up"
          bottom={0}
        />
      )}
      <Pane position="relative" height="85%" width="100%" />
    </Background>
  )
}

GridView.defaultProps = {
  onClick: () => {},
  onContextClick: () => {},
  onDrop: () => {},
}

GridView.propTypes = {
  playRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
  page: PropTypes.shape({
    ref: PropTypes.func.isRequired,
    number: PropTypes.number.isRequired,
  }).isRequired,
  context: PropTypes.object.isRequired,
  contexts: PropTypes.array.isRequired,
  story: PropTypes.object.isRequired,
  memories: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  onContextClick: PropTypes.func,
  onDrop: PropTypes.func,
}

export default GridView
