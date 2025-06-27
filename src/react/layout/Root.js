import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Panel, PanelResizeHandle } from 'react-resizable-panels'

import { Home } from '../features/home/Home'
import { DiographNavigation } from '../features/navigation/DiographNavigation'
import { PanelContainer } from '../features/sidePanel/PanelContainer'
import { Favorites } from '../features/favorites/Favorites'
import { Diograph } from '../features/diograph/Diograph'
import { Lenses } from '../features/lenses/Lenses'
import { Hand } from '../features/hand/Hand'
import { Buttons } from '../features/buttons/Buttons'
import { Tools } from '../features/tools/Tools'
import { SidePanel } from '../features/sidePanel/SidePanel'
import Fullscreen from '../components/Fullscreen'
import { LensesNavigation } from '../features/navigation/LensesNavigation'
import { DiosphereNavigation } from '../features/navigation/DiosphereNavigation'

const Root = () => (
  <>
    <Home />
    <DndProvider backend={HTML5Backend}>
      <Fullscreen zIndex={0}>
        <PanelContainer direction="vertical" sidePanels={['', 'bottom']}>
          <Panel>
            <PanelContainer direction="horizontal" sidePanels={['left', '', 'right']}>
              <SidePanel side="left">
                <DiosphereNavigation />
                <Favorites />
              </SidePanel>
              <PanelResizeHandle />
              <Panel minSize={20} style={{ display: 'flex', flexDirection: 'column' }}>
                <DiographNavigation />
                <Diograph />
              </Panel>
              <PanelResizeHandle />
              <SidePanel side="right">
                <LensesNavigation />
                <Lenses />
              </SidePanel>
            </PanelContainer>
          </Panel>
          <PanelResizeHandle />
          <SidePanel side="bottom">
            <Hand />
          </SidePanel>
        </PanelContainer>
      </Fullscreen>
    </DndProvider>
    <Buttons />
    <Tools />
  </>
)

export default Root
