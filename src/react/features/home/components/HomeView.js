import React from 'react'
import PropTypes from 'prop-types'

import BackgroundDiory from '../../../components/diories/BackgroundDiory'
import DiorysGrid from '../../../components/diories/DiorysGrid'
import Diory from '../../../components/diories/Diory'
import { MenuItem } from '../../../components/menu/MenuItem'

const itemStyle = {
  flex: '1 1 120px',
  height: 80,
  margin: 8,
}
const dioryStyle = {
  text: {
    padding: '4px',
  },
  links: {
    padding: '4px',
  },
}

const HomeView = ({ story, memories, scrollIntoViewId, onStoryClick, onMemoryClick }) => (
  <>
    <BackgroundDiory diory={story} />
    <Diory diory={story} marginLeft={12} marginRight={12} height="50%" onClick={onStoryClick} />
    <MenuItem diory={{ text: 'Import folders' }} margin={12} marginBottom={0} />
    <DiorysGrid
      diorys={memories.map((diory) => ({ ...diory, style: dioryStyle }))}
      scrollIntoViewId={scrollIntoViewId}
      padding={6}
      itemStyle={itemStyle}
      onClick={onMemoryClick}
    />
  </>
)

HomeView.propTypes = {
  story: PropTypes.object,
  memories: PropTypes.array,
  scrollIntoViewId: PropTypes.string,
  onStoryClick: PropTypes.func.isRequired,
  onMemoryClick: PropTypes.func.isRequired,
}

export { HomeView }
