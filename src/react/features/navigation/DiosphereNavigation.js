import React from 'react'

import { useChangeHomeButton } from './useChangeHomeButton'

import { NavigationBar } from './components/NavigationBar'
import { MenuItem } from '../../components/MenuItem'
import { NavigationContent } from './NavigationContent'

export const DiosphereNavigation = () => (
  <NavigationBar>
    <NavigationContent>
      <MenuItem fontWeight="bold" {...useChangeHomeButton()} transform="scale(-1, -1)" />
    </NavigationContent>
  </NavigationBar>
)
