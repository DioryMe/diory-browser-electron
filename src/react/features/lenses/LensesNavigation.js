import React from 'react'
import { Tablist } from 'evergreen-ui'

import { useLensButtons } from '../navigation/useLensButtons'

import NavigationIcon from '../../components/NavigationIcon'

const LensesNavigation = () => {
  const { lensButtons } = useLensButtons()
  return (
    <Tablist alignSelf="center">
      {lensButtons.map((lensButton) => (
        <NavigationIcon {...lensButton} {...lensButton.diory} />
      ))}
    </Tablist>
  )
}

export default LensesNavigation
