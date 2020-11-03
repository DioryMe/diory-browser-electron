import { useStore } from '../../store'
import { selectLens } from './actions'
import { lenses } from './Lenses'

export const useLenses = () => {
  const [{ selectedLensId }, dispatch] = useStore((state) => state.lenses)

  return {
    lenses: Object.entries(lenses).map(([id, { diory }]) => ({
      id,
      key: id,
      diory,
      isSelected: id === selectedLensId,
      onSelect: () => dispatch(selectLens(id)),
    })),
  }
}
