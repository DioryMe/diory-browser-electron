import React from 'react'

import { useStore } from '../../store'
import { useButtons } from '../buttons'
import { useFocusDiory } from '../room/hooks'
import { useLensActions } from './useLensActions'

import Fullscreen from '../../components/Fullscreen'

import fullscreen from './fullscreen'
import grid from './grid'

export const lenses = {
  grid,
  fullscreen,
}

const LensButtons = ({ buttons }) => {
  useButtons(buttons)
  return null
}

const Lenses = () => {
  const { diory, diorys } = useFocusDiory()
  const [{ active }] = useStore((state) => state.buttons)
  const [{ selectedLensId }] = useStore((state) => state.lenses)
  const { View: LensView, buttons } = lenses[selectedLensId]

  const actions = useLensActions()
  return diory ? (
    <Fullscreen marginTop={48} zIndex={-1}>
      <LensButtons buttons={buttons} />
      <LensView
        diory={diory}
        diorys={diorys}
        activeButton={active}
        actions={actions}
      />
    </Fullscreen>
  ) : null
}

export default Lenses
