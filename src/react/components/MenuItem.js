import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'
import Icon from './Icon'

const MenuItem = ({ id, text, icon, amount, date, isSelected, onClick, ...props }) => (
  <Pane
    position="relative"
    color={isSelected ? 'white' : 'grey'}
    alignSelf="center"
    margin={6}
    cursor="pointer"
    fontSize={12}
    textOverflow="ellipsis"
    whiteSpace="nowrap"
    overflow="hidden"
    onClick={onClick}
    display="flex"
    justifyContent="space-between"
    {...props}
  >
    {icon && <Icon icon={icon} verticalAlign="middle" marginRight={6} />}
    <span>{text || date || id || ''}</span>
    <span>{amount || ''}</span>
  </Pane>
)

MenuItem.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  amount: PropTypes.string,
  icon: PropTypes.string,
  date: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
}

export { MenuItem }
