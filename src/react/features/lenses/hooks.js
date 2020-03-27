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

  const toolButtons = Object.entries(Lenses).reduce(
    (obj, [id, Lens]) => ({
      ...obj,
      [id]: Lens.buttons,
    }),
    {}
  )

  return {
    lenses,
    toolButtons,
    selectedLensId,
    selectLens: id => dispatch(selectLens(id)),
    toggleLens,
  }
}
