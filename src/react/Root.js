import React from 'react'
import { useSelector } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

import { useDispatchActions } from './store'
import { useGetHomeConnection } from './features/home/useGetHomeConnection'
import { useGetDiosphereEffect } from './features/diosphere/useGetDiosphereEffect'
import { useGetDiographEffect } from './features/diograph/useGetDiographEffect'
import { useGoSide } from './features/navigation/useGoSide'

import { setSideBarWidth } from './features/sideBar/sideBarActions'

import { Home } from './features/home/Home'
import { Diosphere } from './features/diosphere/Diosphere'
import Navigation from './features/navigation/Navigation'
import Tools from './features/tools/Tools'
import Buttons from './features/buttons/Buttons'
import Fullscreen from './components/Fullscreen'
import Lenses from './features/lenses/Lenses'
import { Hand } from './features/hand/Hand'
import Browser from './features/browser/Browser'

import NavigationToSide from './components/NavigationToSide'
import { debounce } from './utils'

const Root = () => {
  useGetHomeConnection()
  useGetDiosphereEffect()
  useGetDiographEffect()

  const { dispatch } = useDispatchActions()
  const onLayout = (widths) => {
    dispatch(setSideBarWidth('right', widths[1]))
  }

  const { goLeft, goRight } = useGoSide()
  const { loaded } = useSelector((store) => store.diosphere)
  return (
    <>
      <Home />
      <Navigation />
      <DndProvider backend={HTML5Backend}>
        {loaded && (
          <Fullscreen top={44}>
            <PanelGroup direction="horizontal" onLayout={debounce(onLayout, 100)}>
              <Panel defaultSize={10} minSize={1} style={{ position: 'relative' }}>
                <Diosphere />
              </Panel>
              <PanelResizeHandle />
              <Panel defaultSize={80} minSize={10} style={{ position: 'relative' }}>
                <NavigationToSide left onClick={goLeft} />
                <Browser />
                <NavigationToSide right onClick={goRight} />
              </Panel>
              <PanelResizeHandle />
              <Panel defaultSize={10} minSize={1} style={{ position: 'relative' }}>
                <Lenses />
                <Hand />
              </Panel>
            </PanelGroup>
          </Fullscreen>
        )}
        <Tools />
      </DndProvider>
      <Buttons />
    </>
  )
}

export default Root
