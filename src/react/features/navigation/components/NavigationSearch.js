import React from 'react'
import { Pane, SearchInput } from 'evergreen-ui'
import { useStore } from '../../../store'
import { useTextFilter } from '../../filters/hooks'
import { useSearchInputValue } from '../../room/tools/useSearchTool'

const useSearchInput = () => {
  const [{ roomId }] = useStore((state) => state.navigation)
  const { searchInputValue } = useSearchInputValue()
  const { setTextFilter } = useTextFilter()

  const searchInput = roomId && {
    value: searchInputValue,
    placeholder: 'Search your diory',
    onFocus: ({ target: { value } }) => setTextFilter(value),
    onChange: ({ target: { value } }) => setTextFilter(value),
    onClear: () => setTextFilter(''),
  }

  return { searchInput }
}

const NavigationSearch = (props) => {
  const { searchInput } = useSearchInput()
  return <Pane {...props}>{searchInput && <SearchInput width={200} {...searchInput} />}</Pane>
}

export default NavigationSearch
