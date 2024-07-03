import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import CreateDioryButton from '../../tools/create/CreateDioryButton'
import DiorysGrid from '../../../components/DiorysGrid'
import { SearchBar } from './SearchBar'

const scaleContainer = {
  transformOrigin: 'top left',
  transform: 'scale(0.5)',
  width: '200%',
  height: '200%',
}

const SearchView = ({ query, diorys, scrollIntoViewId, onClick, onDrop }) => {
  const searchRef = useRef()
  return (
    <Pane background="#222" height="100%" padding={12}>
      <Pane padding={12}>
        <SearchBar width="100%" />
      </Pane>
      {query && (
        <Pane padding={12}>
          <CreateDioryButton text={query} />
        </Pane>
      )}
      {diorys.length && (
        <DiorysGrid
          ref={searchRef}
          background={{ id: 'hand' }}
          diorys={diorys}
          scrollIntoViewId={scrollIntoViewId}
          onClick={onClick}
          onDrop={onDrop}
          {...scaleContainer}
        />
      )}
    </Pane>
  )
}

SearchView.propTypes = {
  query: PropTypes.string.isRequired,
  diorys: PropTypes.array.isRequired,
  scrollIntoViewId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
}

export default SearchView
