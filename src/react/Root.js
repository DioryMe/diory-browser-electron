import React from 'react'
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
import { Lenses } from './features/lenses/Lenses'
import { Hand } from './features/hand/Hand'
import { Diograph } from './features/diograph/Diograph'
import { SidebarNavigation } from './features/navigation/SidebarNavigation'
import { SideBarContent } from './components/SideBarContent'

import { debounce } from './utils'

const Root = () => {
  const { dispatch } = useDispatchActions()
  const onLayout = (widths) => {
    dispatch(setSideBarWidth('right', widths[widths.length - 1]))
  }

  const { loaded: diographLoaded } = useSelector((state) => state.diograph)
  const { selectedLensId } = useSelector((store) => store.lenses)
  return (
    <>
      <Home />
      <DndProvider backend={HTML5Backend}>
        <Navigation />
        <Fullscreen top={44}>
          <PanelGroup direction="horizontal" onLayout={debounce(onLayout, 100)}>
            <Panel defaultSize={15} minSize={1} style={{ position: 'relative' }}>
              <SideBarContent>
                <SidebarNavigation />
              </SideBarContent>
            </Panel>
            <PanelResizeHandle />
            {diographLoaded && (
              <Panel defaultSize={70} minSize={10} style={{ position: 'relative' }}>
                <Diograph />
              </Panel>
            )}
            <PanelResizeHandle />
            <Panel defaultSize={15} minSize={1} style={{ position: 'relative' }}>
              <Lenses />
              {!selectedLensId && <Hand />}
            </Panel>
          </PanelGroup>
        </Fullscreen>
      </DndProvider>
      <Buttons />
    </>
  )
}

export default Root
