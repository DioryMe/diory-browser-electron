import React from 'react'
import { Pane } from 'evergreen-ui'

import { useStore } from '../../store'

import SearchResult from './SearchResult'

const SearchResults = (props) => {
  const [{ searchResults }] = useStore((state) => state.search)

  return (
    <Pane {...props}>
      {searchResults.map((searchResult) => (
        <SearchResult {...searchResult} />
      ))}
    </Pane>
  )
}

export default SearchResults
