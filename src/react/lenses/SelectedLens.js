import { createElement } from 'react'
import useLenses from './useLenses'
import * as LensComponents from './index'

const SelectedLens = (props) => {
  const [{selectedLensId}] = useLenses()
  return selectedLensId ? createElement(LensComponents[selectedLensId], props) : null
}

export default SelectedLens
