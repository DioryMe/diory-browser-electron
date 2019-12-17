import React from 'react'
import { useDocumentTitle } from '../hooks'
import { useStore } from '../store'

import { SelectedLens, useLenses } from './lenses'
import Home from './Home'
import Room from './Room'

const View = () => {
  useDocumentTitle()
  const { selectedLensId } = useLenses()
  const [{ room }] = useStore(state => state.navigation)

  if (selectedLensId) {
    return <SelectedLens/>
  }

  if (room) {
    return <Room/>
  }

  return <Home />
}

export default View
