import React from 'react'

import { useStore } from '../../store'
import Lenses from './index'

const LensView = () => {
  const [{ selectedLensId }] = useStore((state) => state.lenses)
  const SelectedLens = Lenses[selectedLensId]
  return SelectedLens ? <SelectedLens /> : null
}

export default LensView
