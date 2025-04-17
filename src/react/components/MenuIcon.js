import React from 'react'
import PropTypes from 'prop-types'
import { Tab } from 'evergreen-ui'
import Icon from './Icon'

const MenuIcon = ({ id, icon, isSelected, onClick, disabled, ...props }) =>
  disabled ? null : (
    <Tab
      id={id}
      onSelect={onClick}
      isSelected={isSelected}
      style={{ verticalAlign: 'middle' }}
      color="grey"
      alignSelf="center"
      marginLeft={4}
      marginRight={4}
      borderRadius={4}
      padding={8}
      boxShadow="none"
      cursor="pointer"
      aria-controls={`panel-${id}`}
      data-testid={`${id}-lens`}
      {...props}
    >
      {icon && <Icon icon={icon} size={16} />}
    </Tab>
  )

MenuIcon.propTypes = {
  id: PropTypes.string,
  icon: PropTypes.string,
  isSelected: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}

export default MenuIcon
