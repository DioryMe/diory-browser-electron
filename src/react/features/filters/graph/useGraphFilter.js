import { useDispatchActions } from '../../../store'
import { useFilter } from '../hooks/useFilter'
import { useGenerateGraphFilter } from './useGenerateGraphFilter'

import { setFilter } from '../actions'

const useZoomButtons = () => {
  const { zoom } = useFilter('grid')
  const { dispatch } = useDispatchActions()
  return [
    {
      id: 'plus',
      data: {
        icon: 'plus',
      },
      onClick: () => dispatch(setFilter('grid', { zoom: Math.min(zoom + 1, 3) })),
    },
    {
      id: 'minus',
      data: {
        icon: 'minus',
      },
      onClick: () => dispatch(setFilter('grid', { zoom: Math.max(zoom - 1, 0) })),
    },
  ]
}

export const useGraphFilter = () => ({
  buttons: useZoomButtons(),
  graphFilter: useGenerateGraphFilter(),
})
