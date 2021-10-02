import React from 'react'
import { Pane } from 'evergreen-ui'

import NavigationButtons from './NavigationButtons'
import NavigationLenses from './NavigationLenses'
// import TextFilter from '../../filters/text/TextFilter'
import Icon from '../../../components/Icon'

const NavigationBar = () => (
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
    <NavigationLenses display="flex" />
    <Pane>
      <Icon size={24} icon="filter" marginRight="24px" />
      <Icon size={24} icon="search" marginRight="24px" />
      <Icon size={24} icon="cog" marginRight="24px" />
    </Pane>
    {/* <TextFilter /> */}
  </Pane>
)

export default NavigationBar
