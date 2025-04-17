import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

import { useDispatchActions } from './store'

import { setSideBarWidth } from './features/sideBar/sideBarActions'

import { Home } from './features/home/Home'
import { Navigation } from './features/navigation/Navigation'
import { Buttons } from './features/buttons/Buttons'
import Fullscreen from './components/Fullscreen'
import { Diograph } from './features/diograph/Diograph'
import { Lenses } from './features/lenses/Lenses'
import { HandSideBar } from './features/sideBar/HandSideBar'
import { Tools } from './features/tools/Tools'
import { FavoritesSideBar } from './features/sideBar/FavoritesSideBar'

import { debounce } from './utils'
import SideBarToggle from './features/sideBar/components/SideBarToggle'
import { SideBar } from './features/sideBar/SideBar'

const Root = () => {
  const { dispatch } = useDispatchActions()
  const onLayout = (widths) => {
    console.log(widths)
    dispatch(setSideBarWidth('right', widths[widths.length - 1]))
  }

  const { loaded: diographLoaded } = useSelector((state) => state.diograph)
  const { selectedLensId } = useSelector((store) => store.lenses)
  const { sideBarWidth } = useSelector((state) => state.sideBar)

  return (
    <>
      <Home />
      <DndProvider backend={HTML5Backend}>
        <Navigation />
        <Fullscreen top={44}>
          <PanelGroup direction="horizontal" onLayout={debounce(onLayout, 100)}>
            <SideBar side="left">
              <FavoritesSideBar />
            </SideBar>
            <PanelResizeHandle />
            {diographLoaded && (
              <Panel defaultSize={70} minSize={10} style={{ position: 'relative' }}>
                <Diograph />
              </Panel>
            )}
            <PanelResizeHandle />
            <SideBar side="right">
              <Lenses />
              {!selectedLensId && <HandSideBar />}
            </SideBar>
          </PanelGroup>
        </Fullscreen>
      </DndProvider>
      <Buttons />
      <Tools />
    </>
  )
}

export default Root
