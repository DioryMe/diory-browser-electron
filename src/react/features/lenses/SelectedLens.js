import { createElement } from 'react'
import { useStore } from '../../store'
import Lenses from './Lenses'

const SelectedLens = props => {
  const [{ selectedLensId }] = useStore(state => state.lenses)
  return selectedLensId ? createElement(Lenses[selectedLensId], props) : null
}

export default SelectedLens
