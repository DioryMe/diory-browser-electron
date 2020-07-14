import React from 'react'

import { useDocumentTitle } from './hooks'

import NavigationBar from './components/NavigationBar'
import NavigationFullscreen from './components/NavigationFullscreen'
import NavigationToLeft from './components/NavigationToLeft'
import NavigationToRight from './components/NavigationToRight'

const Navigation = () => {
  useDocumentTitle()
  return (
    <>
      <NavigationBar />
      <NavigationFullscreen />
      <NavigationToLeft />
      <NavigationToRight />
    </>
  )
}

export default Navigation
