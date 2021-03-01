import React from 'react'
import { Pane, SearchInput } from 'evergreen-ui'

import { useFilterEffects } from '../hooks/useFilterEffects'
import { useTextFilter } from './useTextFilter'

const TextFilter = (props) => {
  useFilterEffects('text')
  const { value, placeholder, onChange, onFocus } = useTextFilter()
  return (
    <Pane {...props}>
      <SearchInput
        id="NavigationSearch"
        width={200}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={onFocus}
      />
    </Pane>
  )
}

export default TextFilter
