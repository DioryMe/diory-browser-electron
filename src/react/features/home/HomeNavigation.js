import React from 'react'

import { useDispatchActions, useSelector } from '../../store'

import { setRoomConnections } from '../room/roomActions'

import NavigationButton from '../../components/NavigationButton'

const useNavigationButton = () => {
  const { connections } = useSelector((state) => state.home)
  const { dispatch } = useDispatchActions()
  return {
    text: 'DIORY',
    onClick: () => {
      dispatch(setRoomConnections(connections))
    },
    fontWeight: 'bold',
  }
}

const HomeNavigation = () => {
  const button = useNavigationButton()
  return <NavigationButton {...button} />
}
export default HomeNavigation
