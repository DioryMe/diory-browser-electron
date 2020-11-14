import React from 'react'

import { useStore } from '../../store'
import { useFocusDiory } from '../diograph/hooks'

import Fullscreen from '../../components/Fullscreen'

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

const Lenses = () => {
  const { diory, diorys } = useFocusDiory()
  const [{ selectedLensId }] = useStore((state) => state.lenses)
  const { Lens } = lenses[selectedLensId]

  return diory ? (
    <Fullscreen marginTop={48} zIndex={-1}>
      <Lens diory={diory} diorys={diorys} />
    </Fullscreen>
  ) : null
}

export default Lenses
