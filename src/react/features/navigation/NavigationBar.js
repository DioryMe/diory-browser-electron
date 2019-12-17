import React from 'react'
import { Pane } from 'evergreen-ui'
import{ useDocumentTitle } from './hooks'
import NavigationButtons from './NavigationButtons'
import NavigationLenses from './NavigationLenses'
import NavigationSearch from './NavigationSearch'

const NavigationBar = () => {
  useDocumentTitle()
  return (
    <Pane
      display="flex"
      justifyContent="space-between"
      padding={8}
      background="tint2"
    >
      <NavigationButtons display="flex" alignSelf="center" />
      <NavigationLenses display="flex" />
      <NavigationSearch />
    </Pane>
  )
}

export default NavigationBar
