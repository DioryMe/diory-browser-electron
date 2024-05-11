import React from 'react'
import { SearchInput } from 'evergreen-ui'

import { searchDiories } from './searchActions'
import { useDispatchActions } from '../../../store'

const useSearchInput = () => {
  const { dispatch } = useDispatchActions()
  return {
    onSearch: ({ target: { value } }) => dispatch(searchDiories(value)),
  }
}

export const SearchDiories = () => {
  const { onSearch } = useSearchInput()
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
