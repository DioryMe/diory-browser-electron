import React from 'react'

import { useDispatchActions, useSelector } from '../../store'
import { useSidePanel } from '../sidePanel/useSidePanel'

import { selectLens } from '../lenses/lensesActions'

import { MenuItem } from '../../components/MenuItem'
import { NavigationContent } from './NavigationContent'
import { NavigationBar } from './components/NavigationBar'

export const useActions = () => {
  const { selectedLensId } = useSelector((state) => state.lenses)
  const { openSidePanel, closeSidePanel } = useSidePanel('right')
  const { dispatch } = useDispatchActions()
  return {
    selectLens: ({ id }) => {
      const newSelectedLensId = id === selectedLensId ? null : id
      dispatch(selectLens(newSelectedLensId))
      id === selectedLensId ? closeSidePanel() : openSidePanel()
    },
  }
}

const useLensesButtons = () => {
  const { buttons } = useSelector((state) => state.lenses)
  return {
    buttons: Object.values(buttons).map(({ id, icon }) => ({
      diory: {
        id,
        image: icon,
      },
    })),
  }
}

const LensesNavigation = () => {
  const { buttons } = useLensesButtons()
  const { selectLens } = useActions()
  return (
    <NavigationBar side="right">
      <NavigationContent>
        {buttons.map(({ diory }) => (
          <MenuItem key={diory.id} diory={diory} onClick={selectLens} />
        ))}
      </NavigationContent>
    </NavigationBar>
  )
}

export { LensesNavigation }
