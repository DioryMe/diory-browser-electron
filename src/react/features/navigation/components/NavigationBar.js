import React from 'react'
import { Pane } from 'evergreen-ui'
import { useStore } from '../../../store'

import TextFilter from '../../filters/text/TextFilter'
import LensesBar from '../../lenses/LensesBar'
import NavigationButtons from './NavigationButtons'

const NavigationBar = () => {
  const [{ roomId }] = useStore((state) => state.navigation)

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
      {roomId && <LensesBar display="flex" />}
      {roomId && <TextFilter />}
    </Pane>
  )
}

export default NavigationBar
