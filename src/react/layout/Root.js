import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

import { useLenses } from '../features/lenses/useLenses'

import { Home } from '../features/home/Home'
import { DiographNavigation } from '../features/navigation/DiographNavigation'
import { LayoutContainer } from './LayoutContainer'
import { Favorites } from '../features/favorites/Favorites'
import { Diograph } from '../features/diograph/Diograph'
import { Lenses } from '../features/lenses/Lenses'
import { Hand } from '../features/hand/Hand'
import { Buttons } from '../features/buttons/Buttons'
import { Tools } from '../features/tools/Tools'
import { SideBar } from '../features/sideBar/SideBar'
import Fullscreen from '../components/Fullscreen'
import { LensesNavigation } from '../features/navigation/LensesNavigation'
import { DiosphereNavigation } from '../features/navigation/DiosphereNavigation'

const Root = () => {
  useLenses()
  return (
    <>
      <Home />
      <DndProvider backend={HTML5Backend}>
        <Fullscreen>
          <PanelGroup direction="vertical">
            <Panel>
              <LayoutContainer>
                <SideBar side="left">
                  <DiosphereNavigation />
                  <Favorites />
                  <Hand />
                </SideBar>
                <PanelResizeHandle />
                <Panel minSize={20} style={{ display: 'flex', flexDirection: 'column' }}>
                  <DiographNavigation />
                  <Diograph />
                </Panel>
                <PanelResizeHandle />
                <SideBar side="right">
                  <LensesNavigation />
                  <Lenses />
                </SideBar>
              </LayoutContainer>
            </Panel>
            <PanelResizeHandle />
            <SideBar side="bottom"></SideBar>
          </PanelGroup>
        </Fullscreen>
      </DndProvider>
      <Buttons />
      <Tools />
    </>
  )
}

export default Root
