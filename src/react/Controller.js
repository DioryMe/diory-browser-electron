import React from 'react'
import { useDocumentTitle } from './features/navigation/hooks'
import NavigationBar from './features/navigation/NavigationBar'
import NavigationToLeft from './features/navigation/NavigationToLeft'
import NavigationToRight from './features/navigation/NavigationToRight'
import OperationsBar from './features/operations/OperationsBar'

const Controllers = () => {
  useDocumentTitle()
  return (
    <>
      <NavigationBar />
      <NavigationToLeft />
      <NavigationToRight />
      <OperationsBar />
    </>
  )
}

export default Controllers
