import React from 'react'
import { Pane } from 'evergreen-ui'

import { useDispatch, useStore } from '../../store'
import { setFocus } from '../navigation/actions'

import SearchResult from './SearchResult'

const SearchResults = (props) => {
  const [{ searchResults }] = useStore((state) => state.search)
  const dispatch = useDispatch()

  const onClick = (dioryId) => dispatch(setFocus({ id: dioryId }))

  return (
    <Pane height="100%" overflow="auto" {...props}>
      {searchResults.map((searchResult) => (
        <SearchResult {...searchResult} onClick={onClick} />
      ))}
    </Pane>
  )
}

export default SearchResults
