import React from 'react'
import { SearchInput } from 'evergreen-ui'

import { searchDiories } from './searchActions'
import { useDispatchActions } from '../../../store'

const useSearchBar = () => {
  const { dispatch } = useDispatchActions()
  return {
    onSearch: ({ target: { value } }) => dispatch(searchDiories(value)),
  }
}

export const SearchBar = () => {
  const { onSearch } = useSearchBar()
  return (
    <SearchInput
      autoFocus
      autoComplete="off"
      onChange={onSearch}
      width={160}
      data-testid="search-input"
    />
  )
}
