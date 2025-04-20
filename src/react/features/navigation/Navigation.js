import React from 'react'
import { Pane } from 'evergreen-ui'

import { useDispatchActions, useSelector } from '../../store'

import { selectStory } from './navigationActions'

import NavigationBar from './components/NavigationBar'
import { MenuItem } from '../../components/MenuItem'
import { DiographNavigation } from './DiographNavigation'
import { LensesNavigation } from './LensesNavigation'

const useHomeButton = () => {
  const { address: key } = useSelector((state) => state.home)
  const { dispatch } = useDispatchActions()
  return {
    text: 'DIORY',
    onClick: () => dispatch(selectStory({ key })),
  }
}

export const Navigation = () => {
  return (
    <NavigationBar>
      <MenuItem fontWeight="bold" {...useHomeButton()} />
      <Pane alignSelf="center" marginRight={8} display="flex" flexDirection="row">
        <DiographNavigation />
      </Pane>
      <LensesNavigation />
    </NavigationBar>
  )
}
