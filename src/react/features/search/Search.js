import React from 'react'
import { Pane } from 'evergreen-ui'

import { useStore } from '../../store'

import SearchCreateDioryButton from './SearchCreateDioryButton'
import SearchResults from './SearchResults'

const Search = () => {
  const [{ showSearchBar }] = useStore((state) => state.search)

  return showSearchBar ? (
    <Pane
      background="tint2"
      position="fixed"
      top={48}
      right={0}
      bottom={0}
      width={300}
      display="flex"
      flexDirection="column"
    >
      <SearchCreateDioryButton />
      <SearchResults />
    </Pane>
  ) : null
}

export default Search
