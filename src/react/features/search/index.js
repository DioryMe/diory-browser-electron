import React from 'react'

import { useStore } from '../../store'

import CreateDioryButton from '../tools/create/CreateDioryButton'
import Results from './Results'
import Bar from './Bar'

const Search = (props) => {
  const [{ query, showSearchBar }] = useStore((state) => state.search)
  return showSearchBar ? (
    <Bar {...props}>
      {query ? <CreateDioryButton text={query} /> : null}
      <Results />
    </Bar>
  ) : null
}

export default Search
