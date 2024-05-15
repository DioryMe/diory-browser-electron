import React from 'react'

import { useDiosphere } from './useDiosphere'
import { useSideBar } from '../sideBar/useSideBar'

import NavigationButton from '../../components/NavigationButton'

const useDiosphereButton = () => {
  const { room } = useDiosphere()
  const { toggleSideBar } = useSideBar('left')
  return (
    room && {
      onClick: toggleSideBar,
      text: room.text || room.id,
    }
  )
}

const DiosphereNavigation = () => {
  const diosphereButton = useDiosphereButton()
  return <NavigationButton {...diosphereButton} />
}
export default DiosphereNavigation
