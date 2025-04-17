import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { PanelResizeHandle } from 'react-resizable-panels'

import { useLenses } from '../features/lenses/useLenses'

import { Home } from '../features/home/Home'
import { Navigation } from '../features/navigation/Navigation'
import { LayoutContainer } from './LayoutContainer'
import { Favorites } from '../features/favorites/Favorites'
import { Diograph } from '../features/diograph/Diograph'
import { Lenses } from '../features/lenses/Lenses'
import { Hand } from '../features/hand/Hand'
import { Buttons } from '../features/buttons/Buttons'
import { Tools } from '../features/tools/Tools'
import { SideBar } from '../features/sideBar/SideBar'

const Root = () => {
  useLenses()
  return (
    <>
      <Home />
      <DndProvider backend={HTML5Backend}>
        <Navigation />
        <LayoutContainer>
          <SideBar side="left">
            <Favorites />
          </SideBar>
          <PanelResizeHandle />
          <Diograph />
          <PanelResizeHandle />
          <SideBar side="right">
            <Lenses />
            <Hand />
          </SideBar>
        </LayoutContainer>
      </DndProvider>
      <Buttons />
      <Tools />
    </>
  )
}

export default Root
