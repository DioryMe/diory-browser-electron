import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { useSideBar } from './features/sideBar/useSideBar'

import { Home } from './features/home/Home'
import { Diosphere } from './features/diosphere/Diosphere'
import Navigation from './features/navigation/Navigation'
import Tools from './features/tools/Tools'
import Buttons from './features/buttons/Buttons'
import Fullscreen from './components/Fullscreen'
import SideBar from './features/sideBar/SideBar'
import Lenses from './features/lenses/Lenses'
import Browser from './features/browser/Browser'

import { useInitialiseHome } from './features/home/useInitialiseHome'
import { useEnterRoomEffect } from './features/home/useEnterRoomEffect'

const Root = () => {
  useInitialiseHome()
  useEnterRoomEffect()

  const { showSideBar: showRightSideBar } = useSideBar('right')
  return (
    <>
      <Home />
      <Navigation />
      <DndProvider backend={HTML5Backend}>
        <Fullscreen right={showRightSideBar ? 500 : 0} top={48}>
          <Browser />
        </Fullscreen>
        {showRightSideBar && (
          <SideBar id="right" right={0} top={48} width={500}>
            <Lenses />
          </SideBar>
        )}
      </DndProvider>
      <Diosphere />
      <Tools />
      <Buttons />
    </>
  )
}

export default Root
