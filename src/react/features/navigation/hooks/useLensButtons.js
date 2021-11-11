import { useDispatchActions, useStore } from '../../../store'

import { selectLens } from '../../lenses/actions'

export const useLensButtons = () => {
  const [{ selectedLensId, buttons }] = useStore((state) => state.lenses)
  const { dispatch } = useDispatchActions()
  return {
    lensButtons: Object.values(buttons).map(({ id, ...diory }) => ({
      id,
      key: id,
      diory,
      onSelect: () => dispatch(selectLens(id)),
      isSelected: id === selectedLensId,
    })),
  }
}
