import React from 'react'
import PropTypes from 'prop-types'

import NavigationIcon from '../../../components/NavigationIcon'
import { useDispatchActions, useSelector } from '../../../store'
import { setSideBarWidth, toggleSideBar } from '../sideBarActions'

const useSideBarToggle = (side) => {
  const { showSideBars } = useSelector((state) => state.sideBar)

  const { dispatch } = useDispatchActions()
  const showSideBar = showSideBars[side]
  return {
    showSideBar,
    toggleSideBar: () => {
      dispatch(toggleSideBar(side))
      dispatch(setSideBarWidth(side, showSideBar ? 5 : 20))
    },
  }
}

const SideBarToggle = ({ side, children }) => {
  const { showSideBar, toggleSideBar } = useSideBarToggle(side)

  const closeIcon = side === 'left' ? 'right' : 'left'
  const icon = showSideBar ?  side : closeIcon
  return (
    <>
      <NavigationIcon
        image={`chevron-${icon}`}
        onClick={toggleSideBar}
        alignSelf={side === 'left' ? 'flex-end' : 'flex-start'}
        data-testid="toggleSideBar"
      />
      { showSideBar ? children : null }
    </>
  )
}

SideBarToggle.propTypes = {
  side: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export { SideBarToggle }
