import React from 'react'

import { useDispatchActions, useStore } from '../../store'
import { setActive } from '../buttons/actions'
import { setFocus } from '../navigation/actions'
import { createDiory, createLink } from '../room/actions'
import { useFocusDiory } from '../room/hooks'

import LensContainer from './LensContainer'

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

  const selectedLens = lenses[selectedLensId]
  const LensView = selectedLens.View

  const actions = useActions()
  return (
    <LensContainer {...selectedLens}>
      <LensView diory={diory} diorys={diorys} activeButton={active} actions={actions} />
    </LensContainer>
  )
}

export default Lenses
