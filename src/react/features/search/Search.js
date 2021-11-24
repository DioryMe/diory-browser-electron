import React from 'react'

import { useStore } from '../../store'

import CreateDioryButton from '../tools/create/CreateDioryButton'
import SearchResults from './SearchResults'
import SearchBar from './SearchBar'

const Search = (props) => {
  const [{ query, showSearchBar }] = useStore((state) => state.search)
  return showSearchBar ? (
    <SearchBar {...props}>
      {query ? <CreateDioryButton text={query} /> : null}
      <SearchResults />
    </SearchBar>
  ) : null
}

export default Search
