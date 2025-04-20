import React from 'react'
import { Pane } from 'evergreen-ui'

import { useDispatchActions, useSelector } from '../../store'
import { useSideBarToggle } from '../sideBar/useSideBar'

import { selectLens } from '../lenses/lensesActions'

import { MenuItem } from '../../components/MenuItem'

export const useLensesNavigation = () => {
  const { selectedLensId, buttons } = useSelector((state) => state.lenses)
  const { openSideBar, closeSideBar } = useSideBarToggle('right')
  const { dispatch } = useDispatchActions()
  return {
    buttons: Object.values(buttons).map(({ id, icon }) => ({
      key: id,
      icon,
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
  const { buttons } = useLensesNavigation()
  return (
    <Pane alignSelf="center" marginRight={8} display="flex" flexDirection="row">
      {buttons.map((button) => (
        <MenuItem {...button} />
      ))}
    </Pane>
  )
}

export { LensesNavigation }
