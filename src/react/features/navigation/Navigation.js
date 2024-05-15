import React from 'react'
import { Strong, Tablist } from 'evergreen-ui'

import { useGoSide } from './useGoSide'

import NavigationTopBar from '../../components/NavigationTopBar'
import NavigationToSide from '../../components/NavigationToSide'
import LensesNavigation from '../lenses/LensesNavigation'
import DiosphereNavigation from '../diosphere/DiosphereNavigation'
import DiographNavigation from '../diograph/DiographNavigation'
import { SearchBar } from '../lenses/search/SearchBar'

const DioryIcon = () => (
  <Strong size={600} padding={4} color="greenyellow">
    D
  </Strong>
)

const Navigation = () => {
  const { goLeft, goRight } = useGoSide()
  return (
    <>
      <NavigationTopBar>
        <Tablist display="flex" alignSelf="center">
          <DioryIcon />
          <DiosphereNavigation />
          <DiographNavigation />
        </Tablist>
        <LensesNavigation />
        <SearchBar />
      </NavigationTopBar>
      <NavigationToSide left onClick={goLeft} />
      <NavigationToSide right onClick={goRight} />
    </>
  )
}

export default Navigation
