import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { SideBarPanel } from './components/SideBarPanel'
import { SideBarContainer } from '../../components/SideBarContainer'
import { useSideBar } from './useSideBar'

const SideBar = ({ side, children }) => {
  const { showSideBar } = useSideBar(side)

  const [showContent, setShowContent] = useState(false)
  useEffect(() => {
    if (!showSideBar) {
      setShowContent(false)
    }
    if (showSideBar) {
      setTimeout(() => {
        setShowContent(showSideBar)
      }, 10)
    }
  }, [showSideBar])

  return (
    <SideBarPanel side={side}>
      <SideBarContainer>{showContent && children}</SideBarContainer>
    </SideBarPanel>
  )
}

SideBar.propTypes = {
  side: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export { SideBar }
