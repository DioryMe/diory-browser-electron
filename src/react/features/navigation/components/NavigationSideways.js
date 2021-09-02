import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../../../components/Icon'
import useKeyPress from '../../../utils/useKeyPress'
import { useStore } from '../../../store'

const NavigationSideways = ({ left, right, onClick }) => {
  const [{ selectedLensId }] = useStore((state) => state.lenses)
  useKeyPress(
    left ? 'ArrowLeft' : 'ArrowRight',
    selectedLensId === 'fullscreen' ? onClick : () => {}
  )

  return (
    <div
      data-testid={`navigate-${left ? 'left' : 'right'}`}
      onClick={onClick}
      style={{
        position: 'fixed',
        zIndex: 10001,
        top: '50%',
        transform: 'translate(0, -50%)',
        height: 50,
        width: 50,
        cursor: 'pointer',
        left: left && 0,
        right: right && 0,
      }}
    >
      <Icon icon={`chevron-${left ? 'left' : 'right'}`} color="disabled" size={48} />
    </div>
  )
}

NavigationSideways.defaultProps = {
  left: false,
  right: false,
  onClick: () => {},
}

NavigationSideways.propTypes = {
  left: PropTypes.bool,
  right: PropTypes.bool,
  onClick: PropTypes.func,
}

export default NavigationSideways
