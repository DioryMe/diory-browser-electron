import React, { useEffect } from 'react'

import { useDispatch, useStore } from '../../store'
import { addLensButton } from './actions'

const LensContainer = ({ id, button, children }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    button && dispatch(addLensButton(button))
  }, [button, dispatch])

  const [{ selectedLensId }] = useStore((state) => state.lenses)
  return id === selectedLensId ? children : null
}

export const withLensContainer = (id, button) => (Component) => () =>
  (
    <LensContainer id={id} button={button}>
      <Component />
    </LensContainer>
  )
