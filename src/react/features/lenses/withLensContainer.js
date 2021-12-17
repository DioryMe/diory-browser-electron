import React, { useEffect } from 'react'

import { useDispatch, useStore } from '../../store'
import { addLensButton } from './lensesActions'

const WithLensContainer = ({ id, button, children }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    button && dispatch(addLensButton(button))
  }, [button, dispatch])

  const [{ selectedLensId }] = useStore((state) => state.lenses)
  return id === selectedLensId ? children : null
}

// eslint-disable-next-line react/function-component-definition
export const withLensContainer = (id, button) => (Component) => () =>
  (
    <WithLensContainer id={id} button={button}>
      <Component />
    </WithLensContainer>
  )
