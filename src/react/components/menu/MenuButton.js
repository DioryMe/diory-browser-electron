import React from 'react'
import PropTypes from 'prop-types'
import { Tab } from 'evergreen-ui'
import Icon from '../Icon'

const MenuButton = ({ id, text, image, isSelected, onClick, children, disabled, ...props }) =>
  disabled ? null : (
    <Tab
      id={id}
      onSelect={onClick}
      isSelected={isSelected}
      style={{ verticalAlign: 'middle' }}
      color="white"
      alignSelf="center"
      padding={4}
      cursor="pointer"
      aria-controls={`panel-${id}`}
      data-testid={`${id}-lens`}
      {...props}
    >
      {image && <Icon icon={image} marginRight={8} size={16} />}
      {text || ''}
      {children}
    </Tab>
  )

MenuButton.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string,
  isSelected: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export default MenuButton
