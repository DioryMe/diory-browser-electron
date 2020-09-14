import React from 'react'
import { useStore } from '../../../store'
import { useFocusDiory } from '../../room/hooks'

import Diory from '../../../components/diories/Diory'

const FullscreenLens = () => {
  const [{ selectedLensId }] = useStore((state) => state.lenses)
  const { diory } = useFocusDiory()
  return selectedLensId === 'fullscreen' && <Diory diory={diory} height="100%" />
}

FullscreenLens.diory = {
  text: 'Fullscreen',
  image: 'fullscreen',
}

export default FullscreenLens
