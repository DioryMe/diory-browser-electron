import { useDispatchActions, useSelector } from '../../store'

import { selectLens } from './lensesActions'

export const useLensesNavigation = () => {
  const { selectedLensId, buttons } = useSelector((state) => state.lenses)
  const { dispatch } = useDispatchActions()
  return {
    lensButtons: Object.values(buttons).map(({ id, ...diory }) => ({
      id,
      key: id,
      diory,
      onClick: () => dispatch(selectLens(id !== selectedLensId ? id : undefined)),
      isSelected: id === selectedLensId,
    })),
  }
}
