import React from 'react'

import { NavigationBar } from './components/NavigationBar'
import { DiographAddress } from './DiographAddress'
import { NavigationContent } from './NavigationContent'
import { SidePanelToggleButton } from '../sidePanel/components/SidePanelToggleButton'

export const DiographNavigation = () => (
  <NavigationBar>
    <NavigationContent>
      <SidePanelToggleButton side="left" />
    </NavigationContent>
    <NavigationContent>
      <DiographAddress />
    </NavigationContent>
    <NavigationContent>
      <SidePanelToggleButton side="right" />
    </NavigationContent>
  </NavigationBar>
)
