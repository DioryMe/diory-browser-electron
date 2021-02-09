import React from 'react'
import { useStore } from '../../../store'
import { useGraphFilter } from './useGraphFilter'

import ZoomBar from '../../../components/ZoomBar'

const GraphFilter = () => {
  const [{ grid: gridFilterIsActive }] = useStore((state) => state.filters.active)
  const [{ selectedLensId }] = useStore((state) => state.lenses)
  const gridLensIsActive = selectedLensId === 'grid'
  const { buttons } = useGraphFilter()

  return (
    <div data-testid="filters">
      {gridLensIsActive && gridFilterIsActive && <ZoomBar buttons={buttons} />}
    </div>
  )
}

export default GraphFilter
