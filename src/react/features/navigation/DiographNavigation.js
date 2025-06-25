import React from 'react'
import { useSelector } from '../../store'

import { useUpdateTool } from '../tools/update'
import { useStoryTool } from '../tools/story'

import { useDiories } from '../diograph/utils/useDiories'
import { useContextDiories } from '../diograph/utils/useContextDiories'

import { NavigationBar } from './components/NavigationBar'
import { DiographAddress } from './DiographAddress'
import { NavigationContent } from './NavigationContent'
import { SidePanelToggleButton } from '../sidePanel/components/SidePanelToggleButton'

const useActions = () => {
  const updateDiory = useUpdateTool()
  const selectStory = useStoryTool()
  return {
    selectStory: ({ diory }) => {
      selectStory(diory)
      updateDiory(diory)
    },
  }
}

export const DiographNavigation = () => {
  const { address } = useSelector((state) => state.home)
  const diories = useDiories()
  const contextDiories = useContextDiories()
  const { selectStory } = useActions()

  return (
    <NavigationBar>
      <NavigationContent>
        <SidePanelToggleButton side="left" />
      </NavigationContent>
      <NavigationContent>
        <DiographAddress
          home={{ text: 'DIORY', key: address }}
          {...diories}
          {...contextDiories}
          onClick={selectStory}
        />
      </NavigationContent>
      <NavigationContent>
        <SidePanelToggleButton side="right" />
      </NavigationContent>
    </NavigationBar>
  )
}
