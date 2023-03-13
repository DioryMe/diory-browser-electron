import React from 'react'
import { useDispatchActions, useSelector } from '../../store'
import { selectStory } from '../navigation/navigationActions'
import Diograph from '../diograph/Diograph'

const useOnDioryClick = () => {
  const { dispatch } = useDispatchActions()
  return (node) => {
    dispatch(selectStory(node))
  }
}

export const Room = () => {
  const { diograph = {} } = useSelector((state) => state.diograph)
  const { storyId } = useSelector((state) => state.navigation)
  const onDioryClick = useOnDioryClick()

  return <Diograph storyId={storyId} diograph={diograph} onDioryClick={onDioryClick} />
}
