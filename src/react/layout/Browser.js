import React from 'react'
import { Panel } from 'react-resizable-panels'

import { useDiograph } from '../features/diograph/utils/useDiograph'
import { useIsHome } from '../features/home/utils/useIsHome'

import { PanelContainer } from '../features/sidePanel/PanelContainer'
import { SidePanel } from '../features/sidePanel/SidePanel'
import Fullscreen from '../components/Fullscreen'

import { Favorites } from '../features/favorites/Favorites'
import { Diograph } from '../features/diograph/Diograph'
import { Hand } from '../features/hand/Hand'
import { Lenses } from '../features/lenses/Lenses'
import { Tools } from '../features/tools/Tools'
import { Navigation } from '../features/navigation/Navigation'

export const Browser = () => {
  const { diograph, isDiory, createDiory } = useDiograph()

  return !useIsHome() ? (
    <Fullscreen zIndex={0}>
      <PanelContainer direction="vertical" sidePanels={['', 'bottom']}>
        <Panel className="hover">
          <Navigation diograph={diograph} />
          <PanelContainer direction="horizontal" sidePanels={['left', '', 'right']}>
            <SidePanel side="left">
              <Favorites diograph={diograph} createDiory={createDiory} />
            </SidePanel>
            <Panel minSize={20} style={{ display: 'flex', flexDirection: 'column' }}>
              <Diograph diograph={diograph} />
            </Panel>
            <SidePanel side="right">
              <Lenses diograph={diograph} isDiory={isDiory} createDiory={createDiory} />
            </SidePanel>
          </PanelContainer>
        </Panel>
        {isDiory && (
          <SidePanel side="bottom">
            <Hand diograph={diograph} createDiory={createDiory} />
          </SidePanel>
        )}
      </PanelContainer>
      <Tools isDiory={isDiory} />
    </Fullscreen>
  ) : null
}
