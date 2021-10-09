import React from 'react'

import { useStore } from '../../store'
import { useFocus } from '../diograph/hooks'

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
  const { diory } = useFocus()

  const [{ selectedLensId }] = useStore((state) => state.lenses)
  const { Lens } = lenses[selectedLensId]

  return diory ? (
    <Fullscreen marginTop={48} zIndex={-1}>
      <Lens />
    </Fullscreen>
  ) : null
}

export default Lenses
