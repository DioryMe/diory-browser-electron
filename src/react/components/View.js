import React from 'react'
import { useFocus } from '../hooks'
import { useDocumentTitle } from '../hooks'

import { SelectedLens, useLenses } from './lenses'
import Home from './Home'

const View = () => {
  useDocumentTitle()
  const { selectedLensId } = useLenses()
  const { diory } = useFocus()
  if (!diory) {
    return <div>loading</div>
  }

  return selectedLensId ? <SelectedLens/> : <Home />
}

export default View
