import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Panel } from 'react-resizable-panels'

import { Home } from '../features/home/Home'
import { HomeNavigation } from '../features/home/HomeNavigation'
import { HomeBar } from '../features/home/HomeBar'
import { DiographNavigation } from '../features/diograph/DiographNavigation'
import { Diograph } from '../features/diograph/Diograph'
import { Hand } from '../features/hand/Hand'
import { Lenses } from '../features/lenses/Lenses'
import { LensesNavigation } from '../features/lenses/LensesNavigation'
import { Tools } from '../features/tools/Tools'
import { Buttons } from '../features/buttons/Buttons'
import { PanelContainer } from '../features/sidePanel/PanelContainer'
import { SidePanel } from '../features/sidePanel/SidePanel'

import Fullscreen from '../components/Fullscreen'

const Root = () => (
  <Home>
    <DndProvider backend={HTML5Backend}>
      <Fullscreen zIndex={0}>
        <PanelContainer direction="vertical" sidePanels={['', 'bottom']}>
          <Panel className="hover">
            <PanelContainer direction="horizontal" sidePanels={['left', '', 'right']}>
              <SidePanel side="left">
                <HomeNavigation />
                <HomeBar />
              </SidePanel>
              <Panel minSize={20} style={{ display: 'flex', flexDirection: 'column' }}>
                <DiographNavigation />
                <Diograph />
              </Panel>
              <SidePanel side="right">
                <LensesNavigation />
                <Lenses />
              </SidePanel>
            </PanelContainer>
          </Panel>
          <SidePanel side="bottom">
            <Hand />
          </SidePanel>
        </PanelContainer>
      </Fullscreen>
    </DndProvider>
    <Buttons />
    <Tools />
  </Home>
)

export default Root
