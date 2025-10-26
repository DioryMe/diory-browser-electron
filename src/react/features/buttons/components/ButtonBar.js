import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import Button from '../../../components/Button'

const ButtonBar = ({ buttons }) => (
  <Pane position="absolute" zIndex={1000} bottom={0} cursor="pointer" right={0} padding={8} className="hover">
    {buttons.map((button) => (
      <Button key={button.id} {...button} />
    ))}
  </Pane>
)

ButtonBar.defaultProps = {
  buttons: [],
}

ButtonBar.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    })
  ),
}

export default ButtonBar
