import React from 'react'

import { useInitializeLensButtons } from './useInitializeLensButtons'
import { useStore } from '../../store'

const LensContainer = ({ id, buttons, children }) => {
  useInitializeLensButtons(buttons)
  const [{ selectedLensId }] = useStore((state) => state.lenses)
  return id === selectedLensId ? children : null
}

// eslint-disable-next-line arrow-body-style
export const withLensContainer = (id, button) => (Component) => () => {
  return (
    <LensContainer id={id} buttons={[button]}>
      <Component />
    </LensContainer>
  )
}
