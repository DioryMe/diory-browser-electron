import React from 'react'
import { Pane } from 'evergreen-ui'

import { useStore } from '../../store'

import SearchResult from './SearchResult'

const SearchResults = (props) => {
  const [{ searchResults }] = useStore((state) => state.search)
  const onClick = () => {
    // TODO: How to get searchResult.text to this as parameter?
    alert('jee')
  }

  return (
    <Pane position="absolute" right="0" width="20%" height="500px" overflow="auto" {...props}>
      {searchResults.map((searchResult) => (
        <SearchResult {...searchResult} onClick={onClick} />
      ))}
    </Pane>
  )
}

export default SearchResults
