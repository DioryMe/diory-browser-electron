import React from 'react'
import { Pane } from 'evergreen-ui'

import { useDispatchActions, useSelector } from '../../store'

import { selectStory } from '../navigation/navigationActions'

import NavigationButton from '../../components/NavigationButton'

const navigationTextStyle = {
  color: 'white',
  lineHeight: '28px',
  fontSize: '12px',
  borderRadius: '16px',
}

const useNavigationButton = () => {
  const { rootId, diograph = {} } = useSelector((state) => state.diograph)
  const { id } = useSelector((state) => state.room)
  const roomDiory = diograph[id]
  const { dispatch } = useDispatchActions()
  return (
    roomDiory && {
      onClick: () => dispatch(selectStory({ id: rootId })), // TODO Room path dropdown
      text: roomDiory.text || roomDiory.date,
    }
  )
}

const RoomNavigation = () => {
  const button = useNavigationButton()
  return button ? (
    <>
      <Pane {...navigationTextStyle}>/</Pane>
      <NavigationButton {...button} />
    </>
  ) : null
}
export default RoomNavigation
