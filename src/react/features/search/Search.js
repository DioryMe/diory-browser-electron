import React from 'react'
import { Pane, SearchInput } from 'evergreen-ui'

import { useStore, useDispatchActions } from '../../store'
import { setQuery, setSearchResults } from './actions'

const Search = (props) => {
  const [{ diograph }] = useStore((state) => state.diograph)
  const [{ searchResults }] = useStore((state) => state.search)
  const { dispatch } = useDispatchActions()

  const onChange = ({ target: { value } }) => {
    const searchResults = value
      ? Object.values(diograph || {}).filter(
          ({ text }) => !!text && text.toLowerCase().includes(value.toLowerCase())
        )
      : []
    dispatch(setQuery(value))
    dispatch(setSearchResults(searchResults))
  }

  return (
    <Pane {...props}>
      <SearchInput id="Search" width={200} onChange={onChange} autoComplete="off" />
      {searchResults.map((searchResult) => (
        <div>1: {searchResult.text}</div>
      ))}
    </Pane>
  )
}

export default Search
