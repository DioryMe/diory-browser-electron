import React from 'react'

import { useDispatchActions, useSelector } from '../../store'

import { selectLens } from './lensesActions'

import NavigationIcon from '../../components/NavigationIcon'
import { DEFAULT_LENS } from './Lenses'

export const useLensesNavigation = () => {
  const { selectedLensId, buttons } = useSelector((state) => state.lenses)
  const { dispatch } = useDispatchActions()
  return {
    lensButtons: Object.values(buttons).map(({ id, ...diory }) => ({
      key: id,
      id,
      diory,
      onClick: () =>
        id === selectedLensId ? dispatch(selectLens(DEFAULT_LENS)) : dispatch(selectLens(id)),
      isSelected: id === selectedLensId,
    })),
  }
}

const LensesNavigation = () => {
  const { lensButtons } = useLensesNavigation()
  return lensButtons.map((lensButton) => <NavigationIcon {...lensButton} {...lensButton.diory} />)
}

export default LensesNavigation
