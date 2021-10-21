import React from 'react'

import { useInitializeLensButtons } from './useInitializeLensButtons'
import { useLens } from './useLens'

const LensContainer = ({ id, buttons, children }) => {
  useInitializeLensButtons(buttons)
  const { selectedLensId, story } = useLens()
  return id === selectedLensId && story ? children : null
}

export const withLensContainer = (id, button) => (Component) => () =>
  (
    <LensContainer id={id} buttons={[button]}>
      <Component />
    </LensContainer>
  )
