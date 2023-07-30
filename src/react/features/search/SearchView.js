import React from 'react'
import PropTypes from 'prop-types'
import { Pane, SearchInput } from 'evergreen-ui'

import CreateDioryButton from '../tools/create/CreateDioryButton'
import SearchResult from './SearchResult'

const SearchView = ({ query, results, onClick, onDrop, onSearch }) => (
  <>
    <SearchInput
      autoFocus
      autoComplete="off"
      onChange={onSearch}
      width={250}
      data-testid="search-input"
    />
    {query && <CreateDioryButton text={query} />}
    <Pane paddingX={8} overflow="auto">
      {results.map((diory) => (
        <SearchResult key={diory.id} diory={diory} onClick={onClick} onDrop={onDrop} />
      ))}
    </Pane>
  </>
)

SearchView.propTypes = {
  query: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
}

export default SearchView
