import React from 'react'
import Diory from '../../../components/diories/Diory'
import LensContainer from '../components/LensContainer'

const FULLSCREEN_LENS_ID = 'fullscreen'

const fullscreenDiory = {
  id: FULLSCREEN_LENS_ID,
  text: 'Map',
  image: 'map',
}

const FullscreenLens = () => (
  <LensContainer lensDiory={fullscreenDiory}>
    <Diory height="100%" />
  </LensContainer>
)

export default FullscreenLens
