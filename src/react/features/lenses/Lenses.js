import React, { memo } from 'react'

import { useStore } from '../../store'

import Fullscreen from '../../components/Fullscreen'
import { useFocus } from '../diograph/hooks'
import { useFilteredDiorys } from '../filters/useFilters'

import fullscreen from './fullscreen'
import grid from './grid'
import map from './map'
import timeline from './timeline'

export const lenses = {
  grid,
  map,
  timeline,
  fullscreen,
}

const LensesView = memo(({ diory, diorys, selectedLensId }) => {
  console.log('Diorys in lens', diorys.length)
  const { Lens } = lenses[selectedLensId]

  return diory ? (
    <Fullscreen marginTop={48} zIndex={-1}>
      <Lens diory={diory} diorys={diorys} />
    </Fullscreen>
  ) : null
})

const Lenses = () => {
  const diory = useFocus()
  const diorys = useFilteredDiorys()
  const [{ selectedLensId }] = useStore((state) => state.lenses)
  return <LensesView diory={diory} diorys={diorys} selectedLensId={selectedLensId} />
}
export default Lenses
