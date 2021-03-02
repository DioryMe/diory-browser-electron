import { useDispatchActions, useStore } from '../../../store'

import { activateFilter } from '../../filters/actions'
import { selectLens } from '../../lenses/actions'

import { lenses } from '../../lenses/Lenses'

export const useLensButtons = () => {
  const [{ selectedLensId }] = useStore((state) => state.lenses)
  const [{ filters }] = useStore((state) => state.filters)

  const { dispatch } = useDispatchActions()
  const handleClick = (id) => {
    if (id !== selectedLensId) {
      return dispatch(selectLens(id))
    }
    const { active } = filters[id] || {}
    if (!active) {
      return dispatch(activateFilter(id, true))
    }
    return dispatch(activateFilter(id, false))
  }

  return {
    lensButtons: Object.values(lenses).map(({ diory: { id, ...diory } }) => ({
      id,
      key: id,
      diory,
      onSelect: () => handleClick(id),
      isSelected: id === selectedLensId,
      isFiltered: filters[id] && filters[id].active,
      onRemove: (event) => {
        event.stopPropagation()
        dispatch(activateFilter(id, false))
      },
    })),
  }
}
