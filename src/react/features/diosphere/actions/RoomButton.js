import React from 'react'
import PropTypes from 'prop-types'
import { IconButton } from 'evergreen-ui'
import Icon from '../../../components/Icon'

const RoomButton = ({ icon, onClick, ...props }) => (
  <IconButton
    {...props}
    icon={<Icon icon={icon} />}
    onClick={onClick}
    appearance="minimal"
    intent="success"
    alignSelf="right"
  />
)

RoomButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export { RoomButton }
