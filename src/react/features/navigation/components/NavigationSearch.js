import React from 'react'
import { Pane, SearchInput } from 'evergreen-ui'
import { useLenses } from '../../lenses/hooks'

const useSearchInput = () => {
  const { search, selectLens } = useLenses()

  const searchInput = {
    ...search,
    placeholder: 'Search diories...',
    onFocus: () => selectLens(search.id),
  }

  return { searchInput }
}

const NavigationSearch = props => {
  const { searchInput } = useSearchInput()
  return (
    <Pane {...props}>
      {searchInput.id && <SearchInput marginRight={16} width={150} {...searchInput} />}
    </Pane>
  )
}

export default NavigationSearch
