import React from 'react'
import { Pane } from 'evergreen-ui'

import NavigationButtons from './NavigationButtons'
import LensesNavigation from '../../lenses/Navigation'
import SearchNavigation from '../../search/Navigation'

const NavigationBar = () => (
  <Pane
    display="flex"
    justifyContent="space-between"
    padding={8}
    background="tint2"
    zIndex={15}
    position="absolute"
    width="100%"
  >
    <NavigationButtons display="flex" alignSelf="center" />
    <LensesNavigation display="flex" />
    <SearchNavigation display="flex" alignSelf="center" />
  </Pane>
)

export default NavigationBar
