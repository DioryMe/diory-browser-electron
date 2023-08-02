import React from 'react'
import { Tablist } from 'evergreen-ui'

import { useLensesNavigation } from './useLensesNavigation'

import NavigationIcon from '../../components/NavigationIcon'
import { useSideBar } from '../sideBar/useSideBar'

const LensesNavigation = () => {
  const { lensButtons } = useLensesNavigation()
  const { showSideBar } = useSideBar()
  return showSideBar ? (
    <Tablist alignSelf="center" marginLeft="auto">
      {lensButtons.map((lensButton) => (
        <NavigationIcon {...lensButton} {...lensButton.diory} />
      ))}
    </Tablist>
  ) : null
}

export default LensesNavigation
