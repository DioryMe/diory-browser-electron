import React from 'react'
import { Icon } from 'evergreen-ui'
import { useDispatch, useStore } from '../../../store'
import { setFullscreen } from '../actions'

const useFullscreen = () => {
  const dispatch = useDispatch()
  const [{ fullscreen }] = useStore((state) => state.navigation)
  const icon = !fullscreen
    ? {
        icon: 'fullscreen',
        size: 24,
        style: {
          margin: '12px',
        },
      }
    : {
        icon: 'cross',
        size: 36,
        style: {
          margin: '6px',
        },
      }
  return {
    icon,
    onClick: () => dispatch(setFullscreen(!fullscreen)),
  }
}

const NavigationFullscreen = () => {
  const { icon, onClick } = useFullscreen()
  return (
    <div
      data-testid="navigation-fullscreen"
      onClick={onClick}
      style={{
        position: 'fixed',
        zIndex: 10000,
        top: 48,
        right: 0,
        height: 50,
        width: 50,
        cursor: 'pointer',
      }}
    >
      <Icon {...icon} color="disabled" />
    </div>
  )
}

export default NavigationFullscreen
