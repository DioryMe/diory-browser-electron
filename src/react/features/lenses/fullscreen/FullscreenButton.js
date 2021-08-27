import React from 'react'

import { useDispatchActions } from '../../../store'

import { selectLens } from '../actions'

import Icon from '../../../components/Icon'

const useFullscreenButton = () => {
  const { dispatch } = useDispatchActions()

  return {
    onClick: () => dispatch(selectLens('fullscreen')),
  }
}

const FullscreenButton = () => {
  const { onClick } = useFullscreenButton()

  return (
    <div
      data-testid="close-button"
      onClick={onClick}
      style={{
        position: 'absolute',
        right: 0,
        zIndex: 15,
        height: 36,
        width: 36,
        cursor: 'pointer',
        padding: 10,
        color: 'white',
      }}
    >
      <Icon icon="fullscreen" size={36} />
    </div>
  )
}

export default FullscreenButton
