import React from 'react'
import { Pane, SearchInput } from 'evergreen-ui'
import { useDispatch, useStore } from '../../../store'

import { setTextFilter } from '../../filters/actions'

import { useTextFilterValue } from '../../filters/hooks/useTextFilter'
import { useTurnOnFilters } from '../../filters/hooks/useTurnOnFilters'

const useSearchInput = () => {
  const [{ roomId }] = useStore((state) => state.navigation)

  const { textFilterValue } = useTextFilterValue()
  const { turnOnFilters } = useTurnOnFilters()

  const dispatch = useDispatch()
  const searchInput = roomId && {
    value: textFilterValue,
    placeholder: 'Search your diory',
    onFocus: ({ target: { value } }) => {
      dispatch(setTextFilter(value))
      turnOnFilters()
    },
    onChange: ({ target: { value } }) => dispatch(setTextFilter(value)),
  }

  return { searchInput }
}

const NavigationSearch = (props) => {
  const { searchInput } = useSearchInput()
  return <Pane {...props}>{searchInput && <SearchInput width={200} {...searchInput} />}</Pane>
}

export default NavigationSearch
