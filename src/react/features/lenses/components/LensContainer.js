import React from 'react'
import { useDiographIsReady } from '../../diograph/hooks'
import { useAddLensButton, useLensIsSelected } from '../hooks/useLens'

import Fullscreen from '../../../components/Fullscreen'

const LensContainer = ({ lensDiory, children }) => {
  useAddLensButton(lensDiory)
  const { diographIsReady } = useDiographIsReady()
  const { lensIsSelected } = useLensIsSelected(lensDiory)

  return diographIsReady && lensIsSelected ? (
    <Fullscreen marginTop={48} zIndex={-1}>
      {children}
    </Fullscreen>
  ) : null
}

export default LensContainer
