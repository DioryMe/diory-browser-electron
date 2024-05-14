import React from 'react'
import { Strong, Tablist } from 'evergreen-ui'

import { useGoSide } from './useGoSide'

import NavigationTopBar from '../../components/NavigationTopBar'
import NavigationToSide from '../../components/NavigationToSide'
import LensesNavigation from '../lenses/LensesNavigation'
import DiosphereNavigation from '../diosphere/DiosphereNavigation'
import DiographNavigation from '../diograph/DiographNavigation'
import { SearchDiories } from '../lenses/search/SearchDiories'

const Navigation = () => {
  const { goLeft, goRight } = useGoSide()
  return (
    <>
      <NavigationTopBar>
        <Tablist display="flex" alignSelf="center">
          <Strong size={600} padding={4} color="greenyellow">
            D
          </Strong>
          <DiosphereNavigation />
          <DiographNavigation />
        </Tablist>
        <LensesNavigation />
        <SearchDiories />
      </NavigationTopBar>
      <NavigationToSide left onClick={goLeft} />
      <NavigationToSide right onClick={goRight} />
    </>
  )
}

export default Navigation
