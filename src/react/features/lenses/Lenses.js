import React from 'react'

import { useStore } from '../../store'
import { useFocusDiory } from '../diograph/hooks'
import { useLensActions } from './useLensActions'

import Fullscreen from '../../components/Fullscreen'

import fullscreen from './fullscreen'
import grid from './grid'
import map from './map'

export const lenses = {
  grid,
  map,
  fullscreen,
}

const Lenses = () => {
  const { diory, diorys } = useFocusDiory()
  const [{ active }] = useStore((state) => state.buttons)
  const [{ selectedLensId }] = useStore((state) => state.lenses)
  const { Lens } = lenses[selectedLensId]

  const actions = useLensActions()
  return diory ? (
    <Fullscreen marginTop={48} zIndex={-1}>
      <Lens diory={diory} diorys={diorys} activeButton={active} actions={actions} />
    </Fullscreen>
  ) : null
}

export default Lenses
