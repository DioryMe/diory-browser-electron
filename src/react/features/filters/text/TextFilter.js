import React from 'react'
import { Pane, SearchInput } from 'evergreen-ui'

import { useFilterEffects } from '../hooks/useFilterEffects'
import { useTextFilter } from './useTextFilter'

const TextFilter = (props) => {
  useFilterEffects('text')
  return (
    <Pane {...props}>
      <SearchInput id="NavigationSearch" width={200} {...useTextFilter()} />
    </Pane>
  )
}

export default TextFilter
