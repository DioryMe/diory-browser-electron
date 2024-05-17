import React from 'react'
import { useSelector } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

import { Home } from './features/home/Home'
import { Diosphere } from './features/diosphere/Diosphere'
import Navigation from './features/navigation/Navigation'
import Tools from './features/tools/Tools'
import Buttons from './features/buttons/Buttons'
import Fullscreen from './components/Fullscreen'
import Lenses from './features/lenses/Lenses'
import Browser from './features/browser/Browser'

import { useInitialiseHome } from './features/home/useInitialiseHome'
import { useEnterRoomEffect } from './features/home/useEnterRoomEffect'
import NavigationToSide from './components/NavigationToSide'
import { useGoSide } from './features/navigation/useGoSide'

const Root = () => {
  useInitialiseHome()
  useEnterRoomEffect()

  const { goLeft, goRight } = useGoSide()

  const { loaded } = useSelector((store) => store.diosphere)
  return (
    <>
      <Home />
      <Navigation />
      <DndProvider backend={HTML5Backend}>
        {loaded && (
          <Fullscreen top={48}>
            <PanelGroup direction="horizontal">
              <Panel defaultSize={80} minSize={10} style={{ position: 'relative' }}>
                <NavigationToSide left onClick={goLeft} />
                <Browser />
                <NavigationToSide right onClick={goRight} />
              </Panel>
              <PanelResizeHandle />
              <Panel defaultSize={20} minSize={1} style={{ position: 'relative' }}>
                <Lenses />
              </Panel>
            </PanelGroup>
          </Fullscreen>
        )}
        <Tools />
      </DndProvider>
      <Diosphere />
      <Buttons />
    </>
  )
}

export default Root
