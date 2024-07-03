import React from 'react'
import { Tablist } from 'evergreen-ui'

import NavigationTopBar from '../../components/NavigationTopBar'
import HomeNavigation from '../home/HomeNavigation'
import DiographNavigation from '../diograph/DiographNavigation'
import LensesNavigation from '../lenses/LensesNavigation'

const Navigation = () => (
  <NavigationTopBar>
    <HomeNavigation />
    <Tablist display="flex" alignSelf="center">
      <DiographNavigation />
    </Tablist>
    <Tablist alignSelf="center" marginRight={8}>
      <LensesNavigation />
    </Tablist>
  </NavigationTopBar>
)

export default Navigation
