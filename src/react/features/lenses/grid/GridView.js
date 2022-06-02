import React from 'react'
import PropTypes from 'prop-types'

import BackgroundDiory from '../../../components/diories/BackgroundDiory'
import ContentView from '../../content/ContentView'
import ScrollBackground from '../../../components/ScrollBackground'
import DragDropBackground from '../../../components/DragDropBackground'
import DiorysGrid from '../../../components/DiorysGrid'
import ScrollVertically from '../../../components/ScrollVertically'

const GridView = ({ story, memories, onMemoryClick, room }) => {
  const onDrop = () => {
    console.log('drop')
  }
  const onStoryClick = ({ diory }) => {
    console.log('story click', diory)
  }

  return (
    story && (
      <>
        <BackgroundDiory diory={story} />
        <ContentView diory={story} room={room} />
        <ScrollBackground>
          <DragDropBackground
            position="relative"
            width="100%"
            height="80vh"
            onClick={() => onStoryClick({ diory: story })}
            diory={story}
            onDrop={onDrop}
            data-testid="story"
          />
          <DiorysGrid diorys={memories} onDrop={onDrop} onClick={onMemoryClick} />
          {!!memories.length && (
            <ScrollVertically data-testid="navigate-down" initialDirection="up" bottom={0} />
          )}
        </ScrollBackground>
      </>
    )
  )
}

GridView.propTypes = {
  story: PropTypes.object.isRequired,
  memories: PropTypes.array.isRequired,
  onMemoryClick: PropTypes.func,
  room: PropTypes.object,
}

export default GridView
