import React from 'react'
import { Tablist } from 'evergreen-ui'

import { useDispatchActions, useSelector } from '../../store'
import { useSideBar } from '../sideBar/useSideBar'

import { selectLens } from './lensesActions'

import NavigationIcon from '../../components/NavigationIcon'

export const useLensesNavigation = () => {
  const { selectedLensId, buttons } = useSelector((state) => state.lenses)
  const { dispatch } = useDispatchActions()
  return {
    lensButtons: Object.values(buttons).map(({ id, ...diory }) => ({
      key: id,
      id,
      diory,
      onClick: () => dispatch(selectLens(id)),
      isSelected: id === selectedLensId,
    })),
  }
}

const LensesNavigation = () => {
  const { lensButtons } = useLensesNavigation()
  const { showSideBar } = useSideBar('right')
  return showSideBar ? (
    <Tablist alignSelf="center" marginLeft="auto">
      {lensButtons.map((lensButton) => (
        <NavigationIcon {...lensButton} {...lensButton.diory} />
      ))}
    </Tablist>
  ) : null
}

export default LensesNavigation
