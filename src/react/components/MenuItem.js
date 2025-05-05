import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'
import Icon from './Icon'

const MenuItem = ({ id, text, icon, date, isSelected, onClick, ...props }) => (
  <Pane
    position="relative"
    color={isSelected ? 'white' : 'grey'}
    alignSelf="center"
    padding={6}
    cursor="pointer"
    fontSize={12}
    textOverflow="ellipsis"
    whiteSpace="nowrap"
    overflow="hidden"
    onClick={onClick}
    {...props}
  >
    {icon && <Icon icon={icon} verticalAlign="middle" marginRight={6} />}
    {text || date || id || ''}
  </Pane>
)

MenuItem.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
  date: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
}

export { MenuItem }
