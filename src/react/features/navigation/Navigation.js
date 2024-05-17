import React from 'react'
import { Strong, Tablist } from 'evergreen-ui'

import NavigationTopBar from '../../components/NavigationTopBar'
import LensesNavigation from '../lenses/LensesNavigation'
import DiosphereNavigation from '../diosphere/DiosphereNavigation'
import DiographNavigation from '../diograph/DiographNavigation'
import { SearchBar } from '../lenses/search/SearchBar'

const DioryIcon = () => (
  <Strong size={600} padding={4} color="white">
    DIORY
  </Strong>
)

const Navigation = () => (
  <NavigationTopBar>
    <Tablist display="flex" alignSelf="center">
      <DioryIcon />
      <DiosphereNavigation />
      <DiographNavigation />
    </Tablist>
    <LensesNavigation />
    <SearchBar />
  </NavigationTopBar>
)

export default Navigation
