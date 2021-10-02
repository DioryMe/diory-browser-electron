import React from 'react'
import { Pane } from 'evergreen-ui'
import { useStore } from '../../../store'

import NavigationButtons from './NavigationButtons'
import NavigationLenses from './NavigationLenses'
// import TextFilter from '../../filters/text/TextFilter'
import Icon from '../../../components/Icon'

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
      {roomId && (
        <Pane>
          <Icon size={24} icon="filter" marginRight="24px" />
          <Icon size={24} icon="search" marginRight="24px" />
          <Icon size={24} icon="cog" marginRight="24px" />
        </Pane>
      )}
      {/* roomId && <TextFilter /> */}
    </Pane>
  )
}

export default NavigationBar
