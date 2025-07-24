import React from 'react'
import { useSelector } from '../../store'

import { useSelectStory } from '../tools/selectStory'
import { useSelectDiory } from '../tools/useSelectDiory'

import { useStoryDiories } from './utils/useDiories'
import { useStoryContextDiories } from './utils/useContextDiories'
import { useNavigationActions } from '../navigation/useNavigationActions'

import { NavigationBar } from '../navigation/components/NavigationBar'
import { DiographAddress } from './components/DiographAddress'
import { NavigationContent } from '../navigation/components/NavigationContent'
import { SidePanelToggleButton } from '../sidePanel/components/SidePanelToggleButton'

export const DiographNavigation = () => {
  const diories = useStoryDiories()
  const contextDiories = useStoryContextDiories()
  const { onClick } = useNavigationActions()

  return (
    <NavigationBar>
      <NavigationContent>
        <SidePanelToggleButton side="left" />
      </NavigationContent>
      <NavigationContent>
        <DiographAddress
          {...diories}
          {...contextDiories}
          onClick={onClick}
        />
      </NavigationContent>
      <NavigationContent>
        <SidePanelToggleButton side="right" />
      </NavigationContent>
    </NavigationBar>
  )
}
