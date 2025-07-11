import React from 'react'
import PropTypes from 'prop-types'
import { IconButton, Pane } from 'evergreen-ui'
import Icon from './Icon'

const getActiveProps = (active) =>
  active && {
    appearance: 'primary',
    intent: 'success',
    backgroundColor: 'green',
  }

const Button = ({ text, style = {}, data, active, onClick }) => (
  <Pane
    role="button"
    onClick={onClick}
    data-testid={`${data.testid}-button${active ? '--active' : ''}`}
    tabIndex={0}
    display="flex"
    alignItems="center"
    justifyContent="right"
  >
    <Pane color="white">{text}</Pane>
    <IconButton
      icon={<Icon icon={data.icon} />}
      iconSize={24}
      height={48}
      margin={6}
      borderRadius="50%"
      border="none"
      backgroundColor="lightgray"
      {...getActiveProps(active)}
      {...style}
    />
  </Pane>
)

Button.defaultProps = {
  style: {},
  data: {},
  active: false,
  onClick: () => {},
}

Button.propTypes = {
  style: PropTypes.object,
  data: PropTypes.shape({
    icon: PropTypes.string,
    testid: PropTypes.string,
  }),
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Button
