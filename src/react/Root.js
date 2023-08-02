import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { useSideBar } from './features/sideBar/useSideBar'

import Welcome from './features/welcome/Welcome'
import { Home } from './features/home/Home'
import Navigation from './features/navigation/Navigation'
import Tools from './features/tools/Tools'
import Buttons from './features/buttons/Buttons'
import Fullscreen from './components/Fullscreen'
import SideBar from './features/sideBar/SideBar'
import Lenses from './features/lenses/Lenses'
import Browser from './features/browser/Browser'
import SideBarToggle from './features/sideBar/SideBarToggle'
import SideBarNavigation from './features/sideBar/SideBarNavigation'

const Root = () => {
  const { showSideBar } = useSideBar()
  return (
    <>
      <Welcome />
      <Home />
      <DndProvider backend={HTML5Backend}>
        <Fullscreen right={showSideBar ? 500 : 0}>
          <Navigation />
          <Browser top={44} />
        </Fullscreen>
        <SideBar width={showSideBar ? 500 : 0}>
          <SideBarNavigation />
          <Lenses top={44} />
        </SideBar>
      </DndProvider>
      <SideBarToggle />
      <Tools />
      <Buttons />
    </>
  )
}

export default Root
