import React from 'react'
import { useSelector } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

import { useDispatchActions } from './store'
import { useGetHomeConnection } from './features/home/useGetHomeConnection'
import { useDiographEffect } from './features/diograph/useDiographEffect'

import { setSideBarWidth } from './features/sideBar/sideBarActions'

import { Home } from './features/home/Home'
import { DioryNavigation } from './features/diory/DioryNavigation'
import Buttons from './features/buttons/Buttons'
import Fullscreen from './components/Fullscreen'
import Lenses from './features/lenses/Lenses'
import { Hand } from './features/hand/Hand'
import Diory from './features/diory/Diory'

import { SideBarContent } from './components/SideBarContent'
import Diosphere from './features/diosphere/Diosphere'
import { DiosphereNavigation } from './features/diosphere/DiosphereNavigation'
import { DiosphereSideNavigation } from './features/diosphere/DiosphereSideNavigation'

import { debounce } from './utils'
import { DiorySideNavigation } from './features/diory/DiorySideNavigation'

const Root = () => {
  useGetHomeConnection()
  useDiographEffect()

  const { dispatch } = useDispatchActions()
  const onLayout = (widths) => {
    dispatch(setSideBarWidth('right', widths[widths.length - 1]))
  }

  const { storeId } = useSelector((store) => store.home)
  const { loaded: diographLoaded } = useSelector((state) => state.diograph)
  const { selectedLensId } = useSelector((store) => store.lenses)
  return (
    <>
      <Home />
      <DndProvider backend={HTML5Backend}>
        <DioryNavigation />
        <Fullscreen top={44} bottom={44}>
          <PanelGroup direction="horizontal" onLayout={debounce(onLayout, 100)}>
            <Panel defaultSize={15} minSize={1} style={{ position: 'relative' }}>
              <SideBarContent>
                <DiorySideNavigation />
                <DiosphereSideNavigation />
              </SideBarContent>
            </Panel>
            <PanelResizeHandle />
            {diographLoaded && (
              <Panel defaultSize={70} minSize={10} style={{ position: 'relative' }}>
                {storeId === 'diory' ? <Diory /> : <Diosphere />}
              </Panel>
            )}
            <PanelResizeHandle />
            <Panel defaultSize={15} minSize={1} style={{ position: 'relative' }}>
              <Lenses />
              {!selectedLensId && <Hand />}
            </Panel>
          </PanelGroup>
        </Fullscreen>
        <DiosphereNavigation />
      </DndProvider>
      <Buttons />
    </>
  )
}

export default Root
