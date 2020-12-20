import React from 'react'
import { Pane, SearchInput } from 'evergreen-ui'
import { useStore } from '../../../store'

import { useTextFilter } from '../../filters/text/useTextFilter'

const useSearchInput = () => {
  const [{ roomId }] = useStore((state) => state.navigation)

  const { turnOn, setTextFilter, value } = useTextFilter()

  const searchInput = roomId && {
    value,
    placeholder: 'Search your diory',
    onFocus: ({ target: { value } }) => turnOn(value),
    onChange: ({ target: { value } }) => setTextFilter(value),
  }

  return { searchInput }
}

const NavigationSearch = (props) => {
  const { searchInput } = useSearchInput()
  return (
    <Pane {...props}>
      {searchInput && <SearchInput id="NavigationSearch" width={200} {...searchInput} />}
    </Pane>
  )
}

export default NavigationSearch
