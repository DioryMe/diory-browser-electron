import React from 'react'

import { useDiosphere } from './useDiosphere'
import { useSideBar } from '../sideBar/useSideBar'

import NavigationButton from '../../components/NavigationButton'

const useRoomButton = () => {
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
  const roomButton = useRoomButton()
  return <NavigationButton {...roomButton} />
}
export default DiosphereNavigation
