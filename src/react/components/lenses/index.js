import { createElement } from 'react'

import { useStore } from '../../store'
import { selectLens } from '../../actions/lenses'

import Files from './Files'
import Graph from './Graph'
import Map from './Map'
import Timeline from './Timeline'
import Search from './Search'

const Lenses = {
  files: Files,
  graph: Graph,
  map: Map,
  timeline: Timeline,
  search: Search,
}

export const SelectedLens = props => {
  const [{ selectedLensId }] = useStore(state => state.lenses)
  return selectedLensId ? createElement(Lenses[selectedLensId], props) : null
}

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

  return {
    ...lenses,
    selectedLensId,
    selectLens: id => dispatch(selectLens(id)),
    toggleLens,
  }
}
