import React from 'react'
import PropTypes from 'prop-types'
import { Tab } from 'evergreen-ui'
import Icon from './Icon'

const NavigationIcon = ({ id, image, isSelected, onClick, disabled, ...props }) =>
  disabled ? null : (
    <Tab
      id={id}
      onSelect={onClick}
      isSelected={isSelected}
      style={{ verticalAlign: 'middle' }}
      color="white"
      borderRadius="16px"
      alignSelf="center"
      padding={12}
      marginLeft={4}
      marginRight={4}
      cursor="pointer"
      aria-controls={`panel-${id}`}
      data-testid={`${id}-lens`}
      {...props}
    >
      {image && <Icon icon={image} size={16} />}
    </Tab>
  )

NavigationIcon.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
  isSelected: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}

export default NavigationIcon
