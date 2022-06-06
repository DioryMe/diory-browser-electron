import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'evergreen-ui'
import BackgroundDiory from '../../../components/diories/BackgroundDiory'
import ScrollBackground from '../../../components/ScrollBackground'
import DiorysGrid from '../../../components/DiorysGrid'
import ScrollVertically from '../../../components/ScrollVertically'

const GridView = ({ story, memories, onMemoryClick, onPreviousClick }) =>
  story && (
    <>
      <BackgroundDiory diory={story} />
      <ScrollBackground>
        <DiorysGrid diorys={memories} onClick={onMemoryClick} />
        {!!memories.length && (
          <ScrollVertically data-testid="navigate-down" initialDirection="up" bottom={0} />
        )}
      </ScrollBackground>
      <Button onClick={onPreviousClick}>---- GO BACK ----</Button>
    </>
  )

GridView.propTypes = {
  story: PropTypes.object.isRequired,
  memories: PropTypes.array.isRequired,
  onMemoryClick: PropTypes.func,
  onPreviousClick: PropTypes.func,
}

export default GridView
