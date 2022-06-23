import React from 'react'
import PropTypes from 'prop-types'

import BackgroundDiory from '../../../components/diories/BackgroundDiory'
import ScrollBackground from '../../../components/ScrollBackground'
import DiorysGrid2 from '../../../components/DiorysGrid2'
import ScrollVertically from '../../../components/ScrollVertically'

const GridView2 = ({ story, memories, onMemoryClick }) => {
  console.log('GridView rendered')

  return (
    story && (
      <>
        <BackgroundDiory diory={story} />
        <ScrollBackground>
          <DiorysGrid2 diorys={memories} onClick={onMemoryClick} />
          {!!memories.length && (
            <ScrollVertically data-testid="navigate-down" initialDirection="up" bottom={0} />
          )}
        </ScrollBackground>
      </>
    )
  )
}

GridView2.propTypes = {
  story: PropTypes.object.isRequired,
  memories: PropTypes.array.isRequired,
  onMemoryClick: PropTypes.func,
}

export default GridView2
