import React from 'react'

import { useDispatchActions, useStore } from '../../store'
import { setActive } from '../buttons/actions'
import { setFocus } from '../navigation/actions'
import { createDiory, createLink } from '../diograph/actions'
import { useFocusDiory } from '../diograph/hooks'

import Fullscreen from '../../components/Fullscreen'
import LensButtons from './LensButtons'

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

const useActions = () => {
  const { dispatchAction } = useDispatchActions()

  return {
    setFocus: dispatchAction(setFocus),
    createDiory: dispatchAction(createDiory),
    createLink: dispatchAction(createLink),
    setActive: dispatchAction(setActive),
  }
}

const Lenses = () => {
  const { diory, diorys } = useFocusDiory()
  const [{ active }] = useStore((state) => state.buttons)
  const [{ selectedLensId }] = useStore((state) => state.lenses)
  const { View: LensView, buttons } = lenses[selectedLensId]

  const actions = useActions()
  return diory ? (
    <Fullscreen marginTop={48} zIndex={-1}>
      <LensButtons buttons={buttons} />
      <LensView diory={diory} diorys={diorys} activeButton={active} actions={actions} />
    </Fullscreen>
  ) : null
}

export default Lenses
