import React from 'react'

import { useStoryDiories } from './utils/useDiories'
import { useStoryContextDiories } from './utils/useContextDiories'
import { useSelectStory } from '../tools/selectStory'

import { NavigationBar } from '../navigation/components/NavigationBar'
import { DiographAddress } from './components/DiographAddress'
import { NavigationContent } from '../navigation/components/NavigationContent'
import { SidePanelToggleButton } from '../sidePanel/components/SidePanelToggleButton'

export const DiographNavigation = () => {
  const diories = useStoryDiories()
  const contextDiories = useStoryContextDiories()

  return (
    <NavigationBar>
      <NavigationContent>
        <SidePanelToggleButton side="left" />
      </NavigationContent>
      <NavigationContent>
        <DiographAddress {...diories} {...contextDiories} onClick={useSelectStory()} />
      </NavigationContent>
      <NavigationContent>
        <SidePanelToggleButton side="right" />
      </NavigationContent>
    </NavigationBar>
  )
}
