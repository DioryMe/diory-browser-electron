import React from 'react'

import { useDispatchActions, useSelector } from '../../store'
import { useSidePanel } from '../sidePanel/useSidePanel'

import { selectLens } from '../lenses/lensesActions'

import { MenuItem } from '../../components/MenuItem'
import { NavigationContent } from './NavigationContent'
import { NavigationBar } from './components/NavigationBar'

export const useLensesNavigation = () => {
  const { selectedLensId, buttons } = useSelector((state) => state.lenses)
  const { openSidePanel, closeSidePanel } = useSidePanel('right')
  const { dispatch } = useDispatchActions()
  return {
    buttons: Object.values(buttons).map(({ id, icon }) => ({
      key: id,
      icon,
      onClick: () => {
        const newSelectedLensId = id === selectedLensId ? null : id
        dispatch(selectLens(newSelectedLensId))
        id === selectedLensId ? closeSidePanel() : openSidePanel()
      },
      isSelected: id === selectedLensId,
    })),
  }
}

const LensesNavigation = () => {
  const { buttons } = useLensesNavigation()
  return (
    <NavigationBar side="right">
      <NavigationContent>
        {buttons.map((button) => (
          <MenuItem {...button} />
        ))}
      </NavigationContent>
    </NavigationBar>
  )
}

export { LensesNavigation }
