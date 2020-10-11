import React from 'react'
import Fullscreen from '../../components/Fullscreen'

import { useDispatchActions, useStore } from '../../store'
import { useButtons } from '../buttons'
import { setActive } from '../buttons/actions'
import { setFocus } from '../navigation/actions'
import { createDiory, createLink } from '../room/actions'
import { useFocusDiory } from '../room/hooks'

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
  const { View, buttons } = lenses[selectedLensId]

  useButtons(buttons)
  const actions = useActions()

  return diory ? (
    <Fullscreen marginTop={48} zIndex={-1}>
      <View diory={diory} diorys={diorys} activeButton={active} actions={actions} />
    </Fullscreen>
  ) : null
}

export default Lenses
