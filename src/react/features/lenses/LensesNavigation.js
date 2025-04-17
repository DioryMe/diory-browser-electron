import React from 'react'

import { useDispatchActions, useSelector } from '../../store'
import { useSideBarToggle } from '../sideBar/useSideBar'

import { selectLens } from './lensesActions'

import MenuIcon from '../../components/MenuIcon'

export const useLensesNavigation = () => {
  const { selectedLensId, buttons } = useSelector((state) => state.lenses)
  const { openSideBar, closeSideBar } = useSideBarToggle('right')
  const { dispatch } = useDispatchActions()
  return {
    lensButtons: Object.values(buttons).map(({ id, ...diory }) => ({
      key: id,
      id,
      diory,
      onClick: () => {
        const newSelectedLensId = id === selectedLensId ? null : id
        dispatch(selectLens(newSelectedLensId))
        id === selectedLensId ? closeSideBar() : openSideBar(40)
      },
      isSelected: id === selectedLensId,
    })),
  }
}

const LensesNavigation = () => {
  const { lensButtons } = useLensesNavigation()
  return lensButtons.map((lensButton) => <MenuIcon {...lensButton} {...lensButton.diory} />)
}

export default LensesNavigation
