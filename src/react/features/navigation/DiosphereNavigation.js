import React from 'react'

import { useSaveHomeAddress } from '../home/useSaveHomeAddress'

import { NavigationBar } from './components/NavigationBar'
import { MenuItem } from '../../components/MenuItem'
import { NavigationContent } from './NavigationContent'

export const DiosphereNavigation = () => {
  const { saveHomeAddress } = useSaveHomeAddress()
  return (
    <NavigationBar>
      <NavigationContent>
        <MenuItem
          diory={{ icon: 'log-out' }}
          onClick={saveHomeAddress}
          fontWeight="bold"
          transform="scale(-1, -1)"
        />
      </NavigationContent>
    </NavigationBar>
  )
}
