import React from 'react'
import { Pane } from 'evergreen-ui'

import { useDispatchActions, useStore } from '../../../store'

import NavigationButtons from './NavigationButtons'
import NavigationLenses from './NavigationLenses'
import TextFilter from '../../filters/text/TextFilter'
import { setFocus } from '../actions'
import { useParent } from '../hooks/useGoSide'

const NavigationBar = () => {
  const [{ roomId }] = useStore((state) => state.navigation)
  const parent = useParent()

  const { dispatch } = useDispatchActions()
  const goBack = () => {
    dispatch(setFocus(parent))
  }

  return (
    <Pane
      display="flex"
      justifyContent="space-between"
      padding={8}
      background="tint2"
      zIndex={15}
      position="fixed"
      width="100%"
    >
      <NavigationButtons display="flex" alignSelf="center" />
      {parent && <Pane onClick={goBack}>{parent.text}</Pane>}
      {roomId && <NavigationLenses display="flex" />}
      {roomId && <TextFilter />}
    </Pane>
  )
}

export default NavigationBar
