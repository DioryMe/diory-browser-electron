import React from 'react'

import { NavigationBar } from './components/NavigationBar'
import { DiographAddress } from './DiographAddress'
import { NavigationContent } from './NavigationContent'

export const DiographNavigation = () => (
  <NavigationBar side="center">
    <NavigationContent>
      <DiographAddress />
    </NavigationContent>
  </NavigationBar>
)
