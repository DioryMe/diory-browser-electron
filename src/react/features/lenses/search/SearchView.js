import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import CreateDioryButton from '../../../components/diories/CreateDioryButton'
import DiorysGrid from '../../../components/diories/DiorysGrid'
import Fullscreen from '../../../components/Fullscreen'
import { SidePanelTitle } from '../../../components/SidePanelTitle'

const itemStyle = {
  height: 120,
  minWidth: 120,
  maxWidth: 282,
  margin: 6,
}

const SearchView = ({
  diory,
  memories,
  scrollIntoViewId,
  onClick,
  onSelect,
  onDrop,
  onCreateDiory,
  children,
}) => {
  const searchRef = useRef()
  return (
    <>
      <Pane padding={6}>
        <SidePanelTitle diory={{ text: 'SEARCH' }} />
        <Pane padding={6}>{children}</Pane>
        {diory && (
          <Pane padding={6}>
            <CreateDioryButton {...diory} onClick={onCreateDiory} />
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

SearchView.propTypes = {
  story: PropTypes.object,
  memories: PropTypes.array.isRequired,
  scrollIntoViewId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onCreateDiory: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export { SearchView }
