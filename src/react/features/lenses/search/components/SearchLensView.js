import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import CreateDioryButton from '../../../../components/diories/CreateDioryButton'
import DiorysGrid from '../../../../components/diories/DiorysGrid'
import Fullscreen from '../../../../components/Fullscreen'
import { SidePanelTitle } from '../../../../components/SidePanelTitle'
import { SearchBar } from './SearchBar'

const itemStyle = {
  height: 120,
  minWidth: 120,
  maxWidth: 282,
  margin: 6,
}

const SearchLensView = ({
  story,
  memories,
  scrollIntoViewId,
  onSearch,
  onClick,
  onSelect,
  onDrop,
  onCreateDiory,
}) => {
  const searchRef = useRef()
  return (
    <>
      <Pane padding={6}>
        <SidePanelTitle diory={{ text: 'SEARCH' }} />
        <Pane padding={6}>
          <SearchBar width="100%" onSearch={onSearch} />
        </Pane>
        {story && (
          <Pane padding={6}>
            <CreateDioryButton {...story} onClick={onCreateDiory} />
          </Pane>
        )}
      </Pane>
      <Pane position="relative" flex={1} margin={6}>
        <Fullscreen>
          <DiorysGrid
            ref={searchRef}
            background={{ id: 'search' }}
            diorys={memories}
            scrollIntoViewId={scrollIntoViewId}
            onClick={onClick}
            onSelect={onSelect}
            onDrop={onDrop}
            itemStyle={itemStyle}
            padding={0}
          />
        </Fullscreen>
      </Pane>
    </>
  )
}

SearchLensView.propTypes = {
  story: PropTypes.object,
  memories: PropTypes.array.isRequired,
  scrollIntoViewId: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onCreateDiory: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export { SearchLensView }
