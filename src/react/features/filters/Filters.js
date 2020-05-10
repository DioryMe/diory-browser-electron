import React from 'react'
import { useTextFilterEffects } from './hooks/useTextFilterEffects'

const Filters = () => {
  useTextFilterEffects()

  return <div data-testid="filters" />
}

export default Filters
