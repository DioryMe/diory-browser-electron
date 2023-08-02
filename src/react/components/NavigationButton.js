import React from 'react'
import PropTypes from 'prop-types'
import { Tab } from 'evergreen-ui'
import Icon from './Icon'

const navigationTextStyle = {
  color: 'white',
  lineHeight: '28px',
  fontSize: '12px',
  borderRadius: '16px',
}

const NavigationButton = ({ id, text, image, isSelected, onClick, children, disabled, ...props }) =>
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
      {...navigationTextStyle}
      {...props}
    >
      {image && <Icon icon={image} marginRight={8} size={16} />}
      {text || ''}
      {children}
    </Tab>
  )

NavigationButton.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string,
  isSelected: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export default NavigationButton
