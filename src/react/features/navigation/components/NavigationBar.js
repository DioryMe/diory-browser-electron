import React from 'react'
import { Pane } from 'evergreen-ui'
import { useStore } from '../../../store'

import NavigationButtons from './NavigationButtons'
import NavigationLenses from './NavigationLenses'
// import TextFilter from '../../filters/text/TextFilter'
import Search from '../../search/Search'

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
      {roomId && <NavigationLenses display="flex" />}
      {roomId && <Search /> /* <TextFilter */}
    </Pane>
  )
}

export default NavigationBar
