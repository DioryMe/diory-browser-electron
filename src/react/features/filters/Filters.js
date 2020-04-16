import React from 'react'
import { useTextFilter } from './hooks/useTextFilter'
import { useResetTextFilter } from './hooks/useResetTextFilter'

const Filters = () => {
  useTextFilter()
  useResetTextFilter()

  return <div data-testid="filters" />
}

export default Filters
