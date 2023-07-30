import React from 'react'
import { IconButton, Pane } from 'evergreen-ui'

import { useSideBar } from './useSideBar'

import Icon from '../../components/Icon'

const SideBarToggle = () => {
  const { showSideBar, toggleSideBar } = useSideBar()
  return (
    <Pane position="absolute" top={0} right={0} zIndex={100} padding={4}>
      {showSideBar ? (
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
      )}
    </Pane>
  )
}

export default SideBarToggle
