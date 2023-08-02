import React from 'react'
import { IconButton } from 'evergreen-ui'

import { useSideBar } from './useSideBar'

import Icon from '../../components/Icon'

const SideBarNavigation = () => {
  const { showSideBar, toggleSideBar } = useSideBar()
  return showSideBar ? (
    <IconButton
      appearance="minimal"
      icon={<Icon icon="chevron-left" size={24} />}
      onClick={toggleSideBar}
      data-testid="toggleSideBar"
    />
  ) : (
    <IconButton
      appearance="minimal"
      icon={<Icon icon="chevron-right" size={24} color="disabled" />}
      onClick={toggleSideBar}
      data-testid="toggleSideBar"
    />
  )
}

export default SideBarNavigation
