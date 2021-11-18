import React from 'react'
import { Pane } from 'evergreen-ui'

import { useStore } from '../../store'

import SearchCreateDioryButton from './SearchCreateDioryButton'
import SearchResults from './SearchResults'

const Search = (props) => {
  const [{ showSearchBar }] = useStore((state) => state.search)

  return showSearchBar ? (
    <Pane
      background="tint2"
      position="fixed"
      top={48}
      right={0}
      bottom={0}
      display="flex"
      flexDirection="column"
      {...props}
    >
      <SearchCreateDioryButton />
      <SearchResults />
    </Pane>
  ) : null
}

export default Search
