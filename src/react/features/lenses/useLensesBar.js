import { useStore } from '../../store'
import { selectLens } from './actions'
import Lenses from './index'

export const useLensesBar = () => {
  const [{ selectedLensId }, dispatch] = useStore((state) => state.lenses)

  return {
    lenses: Object.entries(Lenses).map(([id, Lens]) => ({
      id,
      key: id,
      diory: Lens.diory,
      isSelected: id === selectedLensId,
      onSelect: () => dispatch(selectLens(id)),
    })),
  }
}
