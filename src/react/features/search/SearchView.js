import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import SearchBar from './SearchBar'
import CreateDioryButton from '../tools/create/CreateDioryButton'
import SearchResult from './SearchResult'

const SearchView = ({ query, results, onClick, onDrop, ...props }) => (
  <SearchBar data-testid="search-bar" {...props}>
    {query && <CreateDioryButton text={query} />}
    <Pane paddingX={8} overflow="auto">
      {results.map((diory) => (
        <SearchResult key={diory.id} diory={diory} onClick={onClick} onDrop={onDrop} />
      ))}
    </Pane>
  </SearchBar>
)

SearchView.propTypes = {
  query: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
}

export default SearchView
