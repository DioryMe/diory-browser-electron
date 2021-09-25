import React from 'react'
import { Pane, SearchInput } from 'evergreen-ui'

import { useStore, useDispatchActions } from '../../store'
import { setFilter } from '../filters/actions'

const Search = (props) => {
  const [{ diograph }] = useStore((state) => state.diograph)
  const [{ filters }] = useStore((state) => state.filters)
  const { dispatch } = useDispatchActions()

  const onChange = ({ target: { value } }) => {
    const searchResults = value
      ? Object.values(diograph || {}).filter(
          ({ text }) => !!text && text.toLowerCase().includes(value.toLowerCase())
        )
      : []
    dispatch(setFilter('text', { searchResults }))
  }

  return (
    <Pane {...props}>
      <SearchInput id="Search" width={200} onChange={onChange} autocomplete="off" />
      {filters &&
        filters.text &&
        filters.text.searchResults &&
        filters.text.searchResults.map((searchResult) => (
          <div>1: {searchResult && searchResult.text}</div>
        ))}
    </Pane>
  )
}

export default Search
