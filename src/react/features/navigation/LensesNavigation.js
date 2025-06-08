import React from 'react'

import { useDispatchActions, useSelector } from '../../store'
import { useSideBar } from '../sideBar/useSideBar'

import { selectLens } from '../lenses/lensesActions'

import { MenuItem } from '../../components/MenuItem'
import { NavigationContent } from './NavigationContent'
import { NavigationBar } from './components/NavigationBar'
import { SideBarToggleButton } from '../sideBar/components/SideBarToggleButton'

export const useLensesNavigation = () => {
  const { selectedLensId, buttons } = useSelector((state) => state.lenses)
  const { openSideBar, closeSideBar } = useSideBar('right')
  const { dispatch } = useDispatchActions()
  return {
    buttons: Object.values(buttons).map(({ id, icon }) => ({
      key: id,
      icon,
      onClick: () => {
        const newSelectedLensId = id === selectedLensId ? null : id
        dispatch(selectLens(newSelectedLensId))
        id === selectedLensId ? closeSideBar() : openSideBar()
      },
      isSelected: id === selectedLensId,
    })),
  }
}

const LensesNavigation = () => {
  const { buttons } = useLensesNavigation()
  return (
    <NavigationBar>
      <NavigationContent>
        <SideBarToggleButton side="right" />
      </NavigationContent>
      <NavigationContent>
        {buttons.map((button) => (
          <MenuItem {...button} />
        ))}
      </NavigationContent>
    </NavigationBar>
  )
}

export { LensesNavigation }
