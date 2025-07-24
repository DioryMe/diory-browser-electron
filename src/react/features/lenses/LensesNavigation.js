import React from 'react'

import { useDispatchActions, useSelector } from '../../store'
import { useSidePanel } from '../sidePanel/useSidePanel'

import { selectLens } from './lensesActions'

import { MenuItem } from '../../components/MenuItem'
import { NavigationContent } from '../navigation/components/NavigationContent'
import { NavigationBar } from '../navigation/components/NavigationBar'

export const useActions = () => {
  const { selectedLensId } = useSelector((state) => state.lenses)
  const { openSidePanel, closeSidePanel } = useSidePanel('right')
  const { dispatch } = useDispatchActions()
  return {
    selectLens: ({ diory }) => {
      const newSelectedLensId = diory.id === selectedLensId ? null : diory.id
      dispatch(selectLens(newSelectedLensId))
      diory.id === selectedLensId ? closeSidePanel() : openSidePanel()
    },
  }
}

const useLensesButtons = () => {
  const { buttons } = useSelector((state) => state.lenses)
  const { selectedLensId } = useSelector((state) => state.lenses)
  return {
    buttons: Object.values(buttons).map(({ id, text, icon }) => ({
      diory: {
        id,
        text,
        icon,
      },
      isSelected: selectedLensId === id,
    })),
  }
}

const LensesNavigation = () => {
  const { buttons } = useLensesButtons()
  const { selectLens } = useActions()
  return (
    <NavigationBar side="right">
      <NavigationContent>
        {buttons.map(({ diory, isSelected }) => (
          <MenuItem key={diory.id} diory={diory} isSelected={isSelected} onClick={selectLens} />
        ))}
      </NavigationContent>
    </NavigationBar>
  )
}

export { LensesNavigation }
