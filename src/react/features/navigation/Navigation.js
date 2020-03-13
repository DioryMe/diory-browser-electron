import React from 'react'
import { Pane } from 'evergreen-ui'
import NavigationButtons from './components/NavigationButtons'
import NavigationLenses from './components/NavigationLenses'
import NavigationSearch from './components/NavigationSearch'
import NavigationToLeft from './components/NavigationToLeft'
import NavigationToRight from './components/NavigationToRight'

const Navigation = () => {
  return (
    <>
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
      <NavigationToLeft />
      <NavigationToRight />
    </>
  )
}

export default Navigation
