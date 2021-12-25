import { useDispatchActions, useSelector } from '../../../store'

import { selectLens } from '../../lenses/lensesActions'

export const useLensButtons = () => {
  const { selectedLensId, buttons } = useSelector((state) => state.lenses)
  const { dispatch } = useDispatchActions()
  return {
    lensButtons: Object.values(buttons).map(({ id, ...diory }) => ({
      id,
      key: id,
      diory,
      onSelect: () => dispatch(selectLens(id !== selectedLensId ? id : undefined)),
      isSelected: id === selectedLensId,
    })),
  }
}
