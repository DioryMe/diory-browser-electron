import React from 'react'
import { Pane } from 'evergreen-ui'
import NavigationButtons from './NavigationButtons'
import LensesNavigation from '../../lenses/LensesNavigation'
import NavigationSearch from './NavigationSearch'

const NavigationBar = () => (
  <Pane display="flex" justifyContent="space-between" padding={8} background="tint2" zIndex={15}>
    <NavigationButtons display="flex" alignSelf="center" />
    <LensesNavigation display="flex" />
    <NavigationSearch />
  </Pane>
)

export default NavigationBar
