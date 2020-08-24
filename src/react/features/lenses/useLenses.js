import { useStore } from '../../store'
import { selectLens } from './actions'
import Lenses from './index'

export const useLenses = () => {
  const [{ selectedLensId }, dispatch] = useStore((state) => state.lenses)

  return {
    lenses: Object.entries(Lenses).map(([id, Lens]) => ({
      id,
      key: id,
      diory: Lens.diory,
    })),
    lensButtons: selectedLensId && Lenses[selectedLensId].buttons,
    selectedLensId,
    selectLens: (id) => dispatch(selectLens(id)),
  }
}
