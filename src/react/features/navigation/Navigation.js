import React from 'react'
import { Tablist } from 'evergreen-ui'

import NavigationTopBar from '../../components/NavigationTopBar'
import HomeNavigation from '../home/HomeNavigation'
import DiosphereNavigation from '../diosphere/DiosphereNavigation'
import DiographNavigation from '../diograph/DiographNavigation'
import LensesNavigation from '../lenses/LensesNavigation'
import { SearchBar } from '../lenses/search/SearchBar'

const Navigation = () => (
  <NavigationTopBar>
    <Tablist display="flex" alignSelf="center">
      <HomeNavigation />
      <DiosphereNavigation />
      <DiographNavigation />
    </Tablist>
    <LensesNavigation />
    <SearchBar />
  </NavigationTopBar>
)

export default Navigation
