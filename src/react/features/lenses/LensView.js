import React from 'react'

import { useStore } from '../../store'
import Fullscreen from '../../components/Fullscreen'
import Lenses from './index'

const LensView = () => {
  const [{ selectedLensId }] = useStore((state) => state.lenses)
  const SelectedLens = Lenses[selectedLensId]
  return selectedLensId ? (
    <Fullscreen marginTop={48}>
      <SelectedLens />
    </Fullscreen>
  ) : null
}

export default LensView
