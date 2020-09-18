import React from 'react'

import { useButtons } from '../buttons'
import { useFocusDiory } from '../room/hooks'

import Fullscreen from '../../components/Fullscreen'

const LensContainer = ({ buttons, children }) => {
  useButtons(buttons)
  const { diory } = useFocusDiory()

  return diory ? (
    <Fullscreen marginTop={48} zIndex={10}>
      {children}
    </Fullscreen>
  ) : null
}

export default LensContainer
