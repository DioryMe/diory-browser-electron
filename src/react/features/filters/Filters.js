import React from 'react'
import { useTextFilterEffects } from './text/useTextFilterEffects'

const Filters = () => {
  useTextFilterEffects()

  return <div data-testid="filters" />
}

export default Filters
