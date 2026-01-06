import React from 'react'
import { Panel } from 'react-resizable-panels'

import { PanelContainer } from '../features/sidePanel/PanelContainer'
import { SidePanel } from '../features/sidePanel/SidePanel'
import Fullscreen from '../components/Fullscreen'

import { Favorites } from '../features/favorites/Favorites'
import { DiographNavigation } from '../features/diograph/DiographNavigation'
import { Diograph } from '../features/diograph/Diograph'
import { Hand } from '../features/hand/Hand'
import { Lenses } from '../features/lenses/Lenses'
import { LensesNavigation } from '../features/lenses/LensesNavigation'
import { Tools } from '../features/tools/Tools'

export const Browser = () => (
  <Fullscreen zIndex={0}>
    <PanelContainer direction="vertical" sidePanels={['', 'bottom']}>
      <Panel className="hover">
        <PanelContainer direction="horizontal" sidePanels={['left', '', 'right']}>
          <SidePanel side="left">
            <Favorites />
          </SidePanel>
          <Panel minSize={20} style={{ display: 'flex', flexDirection: 'column' }}>
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
    <Tools />
  </Fullscreen>
)
