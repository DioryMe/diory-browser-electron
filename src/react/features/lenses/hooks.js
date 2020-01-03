import { useStore } from '../../store'
import { selectLens } from './actions'
import Lenses from './index'

export const useLenses = () => {
  const [{ selectedLensId }, dispatch] = useStore(state => state.lenses)

  const toggleLens = id => {
    const nextSelectedLensId = id === selectedLensId ? undefined : id
    dispatch(selectLens(nextSelectedLensId))
  }

  const lenses = Object.entries(Lenses).reduce(
    (obj, [id, Lens]) => ({
      ...obj,
      [id]: {
        id,
        key: id,
        diory: Lens.diory,
      },
    }),
    {}
  )

  const operations = Object.entries(Lenses).reduce(
    (obj, [id, Lens]) => ({
      ...obj,
      [id]: Lens.operations,
    }),
    {}
  )

  return {
    lenses,
    operations,
    selectedLensId,
    selectLens: id => dispatch(selectLens(id)),
    toggleLens,
  }
}
