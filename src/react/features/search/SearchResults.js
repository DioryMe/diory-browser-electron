import React from 'react'
import { Pane } from 'evergreen-ui'

import { useStore } from '../../store'

const SearchResults = (props) => {
  const [{ searchResults }] = useStore((state) => state.search)

  return (
    <Pane {...props}>
      {searchResults.map((searchResult) => (
        <div>1: {searchResult.text}</div>
      ))}
    </Pane>
  )
}

export default SearchResults
