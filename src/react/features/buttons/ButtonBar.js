import React from 'react'
import PropTypes from 'prop-types'

import { useButtonBar } from './useButtonBar'
import Button from './Button'

export const ButtonBar = ({ buttons }) => (
  <div
    style={{
      position: 'fixed',
      zIndex: 1000,
      bottom: 0,
      cursor: 'pointer',
      left: 0,
      padding: 8,
    }}
  >
    {buttons.map((button) => (
      <Button key={button.id} {...button} />
    ))}
  </div>
)

ButtonBar.defaultProps = {
  buttons: [],
}

ButtonBar.propTypes = {
  buttons: PropTypes.object,
}

const ButtonBarWithHooks = () => <ButtonBar {...useButtonBar()} />
export default ButtonBarWithHooks
