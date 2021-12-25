import React, { useEffect } from 'react'

import { useDispatchActions, useSelector } from '../../store'
import { addLensButton } from './lensesActions'

const WithLensContainer = ({ id, button, children }) => {
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    button && dispatch(addLensButton(button))
  }, [button, dispatch])

  const { selectedLensId } = useSelector((state) => state.lenses)
  return id === selectedLensId ? children : null
}

export const withLensContainer = (id, button) => (Component) => () =>
  (
    <WithLensContainer id={id} button={button}>
      <Component />
    </WithLensContainer>
  )
