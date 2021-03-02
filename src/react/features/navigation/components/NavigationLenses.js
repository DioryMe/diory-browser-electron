import React from 'react'
import { Pane, Tablist } from 'evergreen-ui'

import { useLensButtons } from '../hooks/useLensButtons'

import LensButton from '../../../components/LensButton'

const NavigationLenses = () => {
  const { lensButtons } = useLensButtons()
  return (
    <Pane display="flex">
      <Tablist alignSelf="center">
        {lensButtons.map((lensButton) => (
          <LensButton {...lensButton} />
        ))}
      </Tablist>
    </Pane>
  )
}

export default NavigationLenses
