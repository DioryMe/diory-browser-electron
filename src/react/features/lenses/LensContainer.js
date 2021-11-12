import React from 'react'

import { useInitializeLensButtons } from './useInitializeLensButtons'
import { useStore } from '../../store'

const LensContainer = ({ id, buttons, children }) => {
  useInitializeLensButtons(buttons)
  const [{ selectedLensId }] = useStore((state) => state.lenses)
  return id === selectedLensId ? children : null
}

export const withLensContainer = (id, button) => (Component) => () =>
  (
    <LensContainer id={id} buttons={[button]}>
      <Component />
    </LensContainer>
  )
