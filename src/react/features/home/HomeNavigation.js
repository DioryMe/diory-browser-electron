import React from 'react'

import { useSideBar } from '../sideBar/useSideBar'

import NavigationButton from '../../components/NavigationButton'

const useHomeButton = () => {
  const { toggleSideBar } = useSideBar('left')
  return {
    text: 'DIORY',
    onClick: toggleSideBar,
    fontWeight: 'bold',
  }
}

const HomeNavigation = () => {
  const button = useHomeButton()
  return <NavigationButton {...button} />
}
export default HomeNavigation
