import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

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

// eslint-disable-next-line react/function-component-definition
export const withLensContainer = (id, button) => (Component) => () =>
  (
    <WithLensContainer id={id} button={button}>
      <Component />
    </WithLensContainer>
  )

WithLensContainer.propTypes = {
  id: PropTypes.string,
  button: PropTypes.string,
  children: PropTypes.node,
}
