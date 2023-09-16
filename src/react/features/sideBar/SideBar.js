import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'
import { useSideBar } from './useSideBar'

const SideBar = ({ id, children, ...props }) => {
  const { showSideBar } = useSideBar(id)
  return showSideBar ? (
    <Pane
      background="tint2"
      position="absolute"
      bottom={0}
      display="flex"
      flexDirection="column"
      {...props}
    >
      {children}
    </Pane>
  ) : null
}

SideBar.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
}

export default SideBar
