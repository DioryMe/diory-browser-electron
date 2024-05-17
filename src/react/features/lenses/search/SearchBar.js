import React from 'react'
import { SearchInput } from 'evergreen-ui'

import { searchDiories } from './searchActions'
import { useDispatchActions, useSelector } from '../../../store'
import { selectLens } from '../lensesActions'
import { useDiosphere } from '../../diosphere/useDiosphere'

const useSearchBar = () => {
  const { room } = useDiosphere()
  const { selectedLensId } = useSelector((state) => state.lenses)
  const { dispatch } = useDispatchActions()
  return {
    disabled: !!room,
    onSearch: ({ target: { value } }) => {
      dispatch(searchDiories(value))
      if (selectedLensId !== 'search') {
        dispatch(selectLens('search'))
      }
    },
  }
}

export const SearchBar = () => {
  const { disabled, onSearch } = useSearchBar()
  return disabled ? null : (
    <SearchInput
      autoFocus
      autoComplete="off"
      onChange={onSearch}
      width={160}
      data-testid="search-input"
    />
  )
}
