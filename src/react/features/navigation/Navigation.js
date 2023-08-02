import React from 'react'
import { Tablist } from 'evergreen-ui'

import { useGoSide } from './useGoSide'

import NavigationTopBar from '../../components/NavigationTopBar'
import NavigationToSide from '../../components/NavigationToSide'
import LensesNavigation from '../lenses/LensesNavigation'
import SideBarNavigation from '../sideBar/SideBarNavigation'
import DiosphereNavigation from '../diosphere/DiosphereNavigation'
import HomeNavigation from '../home/HomeNavigation'
import RoomNavigation from '../room/RoomNavigation'
import DiographNavigation from '../diograph/DiographNavigation'

const Navigation = () => {
  const { goLeft, goRight } = useGoSide()
  return (
    <>
      <NavigationTopBar>
        <Tablist display="flex" alignSelf="center">
          <DiosphereNavigation />
          <HomeNavigation />
          <RoomNavigation />
          <DiographNavigation />
        </Tablist>
        <LensesNavigation />
        <SideBarNavigation />
      </NavigationTopBar>
      <NavigationToSide left onClick={goLeft} />
      <NavigationToSide right onClick={goRight} />
    </>
  )
}

export default Navigation
