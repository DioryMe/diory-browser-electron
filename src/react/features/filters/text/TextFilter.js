import React from 'react'
import { Pane, SearchInput } from 'evergreen-ui'

import { useTextFilter } from './useTextFilter'

const TextFilter = (props) => (
  <Pane {...props}>
    <SearchInput id="NavigationSearch" width={200} {...useTextFilter()} />
  </Pane>
)

export default TextFilter
