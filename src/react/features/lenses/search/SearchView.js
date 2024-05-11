import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import CreateDioryButton from '../../tools/create/CreateDioryButton'
import DiorysGrid from '../../../components/DiorysGrid'

const scaleContainer = {
  transformOrigin: 'top left',
  transform: 'scale(0.5)',
  width: '200%',
  height: '200%',
}

const SearchView = ({ query, diorys, scrollIntoViewId, onClick, onDrop, onBackgroundDrop }) => {
  const searchRef = useRef()
  return (
    <Pane background="#222" height="100%">
      {query && <CreateDioryButton text={query} />}
      <DiorysGrid
        ref={searchRef}
        background={{ id: 'hand' }}
        diorys={diorys}
        scrollIntoViewId={scrollIntoViewId}
        onClick={onClick}
        onDrop={onDrop}
        onBackgroundDrop={onBackgroundDrop}
        {...scaleContainer}
      />
    </Pane>
  )
}

SearchView.propTypes = {
  query: PropTypes.string.isRequired,
  diorys: PropTypes.array.isRequired,
  scrollIntoViewId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onBackgroundDrop: PropTypes.func.isRequired,
}

export default SearchView
