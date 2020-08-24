import React from 'react'
import Fullscreen from '../../components/Fullscreen'

import { useStore } from '../../store'
import Lenses from './index'

const LensView = () => {
  const [{ selectedLensId }] = useStore((state) => state.lenses)
  const SelectedLens = Lenses[selectedLensId]
  return !SelectedLens ? null : (
    <Fullscreen marginTop={48} zIndex={10}>
      <SelectedLens />
    </Fullscreen>
  )
}

export default LensView
