import React from 'react'
import { useSelector } from '../../store'

import { useSelectStory } from '../tools/selectStory'
import { useSelectDiory } from '../tools/useSelectDiory'

import { useDiories } from '../diograph/utils/useDiories'
import { useContextDiories } from '../diograph/utils/useContextDiories'

import { NavigationBar } from './components/NavigationBar'
import { DiographAddress } from './DiographAddress'
import { NavigationContent } from './NavigationContent'
import { SidePanelToggleButton } from '../sidePanel/components/SidePanelToggleButton'

const useNavigationActions = () => {
  const { selectStory } = useSelectStory()
  const { selectDiory } = useSelectDiory()
  return {
    onClick: ({ diory }) => {
      selectStory(diory)
      selectDiory(diory)
    },
  }
}

export const DiographNavigation = () => {
  const { address } = useSelector((state) => state.home)
  const diories = useDiories()
  const contextDiories = useContextDiories()
  const { onClick } = useNavigationActions()

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
          onClick={onClick}
        />
      </NavigationContent>
      <NavigationContent>
        <SidePanelToggleButton side="right" />
      </NavigationContent>
    </NavigationBar>
  )
}
