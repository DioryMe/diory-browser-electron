import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'
import Icon from '../Icon'

const MenuItem = ({ diory, isSelected, onClick, ...props }) => (
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
    onClick={() => onClick && onClick({ diory })}
    display="flex"
    justifyContent="space-between"
    {...props}
  >
    {diory.icon && <Icon icon={diory.icon} verticalAlign="middle" />}
    {diory.text && (
      <Pane fontWeight="bold" marginLeft={4}>
        {diory.text}
      </Pane>
    )}
  </Pane>
)

MenuItem.propTypes = {
  diory: PropTypes.object,
  icon: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
}

export { MenuItem }
