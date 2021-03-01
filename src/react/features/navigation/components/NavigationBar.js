import React from 'react'
import { Pane } from 'evergreen-ui'
import { useStore } from '../../../store'

import NavigationButtons from './NavigationButtons'
import LensesBar from '../../lenses/components/LensesBar'
import TextFilter from '../../filters/text/TextFilter'

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
