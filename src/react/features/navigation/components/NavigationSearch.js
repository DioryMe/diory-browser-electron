import React from 'react'
import { Pane, SearchInput } from 'evergreen-ui'

import { useTextFilter } from '../../filters/text/useTextFilter'

const useSearchInput = () => {
  const { turnOn, setTextFilter, value = '' } = useTextFilter()

  return {
    value,
    placeholder: 'Search your diory',
    onFocus: ({ target: { value } }) => turnOn(value),
    onChange: ({ target: { value } }) => setTextFilter(value),
  }
}

const NavigationSearch = (props) => {
  const searchInput = useSearchInput()
  return (
    <Pane {...props}>
      <SearchInput id="NavigationSearch" width={200} {...searchInput} />
    </Pane>
  )
}

export default NavigationSearch
