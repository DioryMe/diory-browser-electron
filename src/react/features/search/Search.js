import React from 'react'

import { useStore } from '../../store'

import SearchCreateDioryButton from './SearchCreateDioryButton'
import SearchResults from './SearchResults'
import SearchBar from './SearchBar'

const Search = (props) => {
  const [{ showSearchBar }] = useStore((state) => state.search)
  return showSearchBar ? (
    <SearchBar {...props}>
      <SearchCreateDioryButton />
      <SearchResults />
    </SearchBar>
  ) : null
}

export default Search
