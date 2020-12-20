import { useDispatchActions, useStore } from '../../store'

import { activateFilter } from '../filters/actions'
import { selectLens } from './actions'

import { lenses } from './Lenses'

export const useLensesBar = () => {
  const [{ selectedLensId }] = useStore((state) => state.lenses)
  const [{ active }] = useStore((state) => state.filters)

  const { dispatch } = useDispatchActions()
  const handleClick = (id) => {
    if (id !== selectedLensId) {
      return dispatch(selectLens(id))
    }
    if (!active[id]) {
      return dispatch(activateFilter({ [id]: true }))
    }
    return dispatch(activateFilter({ [id]: false }))
  }

  return {
    lenses: Object.entries(lenses).map(([id, { diory }]) => ({
      id,
      key: id,
      diory,
      onSelect: () => handleClick(id),
      isSelected: id === selectedLensId,
      isFiltered: !!active[id],
      onRemove: (event) => {
        event.stopPropagation()
        dispatch(activateFilter({ [id]: false }))
      },
    })),
  }
}
