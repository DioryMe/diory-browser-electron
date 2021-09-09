import React from 'react'
import PropTypes from 'prop-types'

import { useDispatchActions } from '../../../store'

import { selectLens } from '../actions'
import { setSelectedDiory } from '../../navigation/actions'

import Icon from '../../../components/Icon'

const useFullscreenButton = (focusId) => {
  const { dispatch } = useDispatchActions()

  return {
    onClick: () => {
      dispatch(selectLens('fullscreen'))
      if (focusId) {
        dispatch(setSelectedDiory({ id: focusId }))
      }
    },
  }
}

const FullscreenButton = ({ focusId }) => {
  const { onClick } = useFullscreenButton(focusId)

  return (
    <div
      data-testid="fullscreen-button"
      onClick={onClick}
      style={{
        position: 'absolute',
        right: 0,
        zIndex: 15,
        height: 18,
        width: 18,
        cursor: 'pointer',
        padding: 10,
        color: 'white',
      }}
    >
      <Icon icon="fullscreen" size={18} />
    </div>
  )
}

FullscreenButton.propTypes = {
  focusId: PropTypes.string,
}

export default FullscreenButton
