import { useEffect } from 'react'
import { useDispatchActions, useSelector } from '../../store'

import { selectRoom, selectStory } from './navigationActions'

export const useInitialNavigationEffect = () => {
  const { dispatch } = useDispatchActions()

  const { rooms } = useSelector((state) => state.diosphere)
  const homeRoom = rooms['/']
  useEffect(() => {
    if (homeRoom) {
      dispatch(selectRoom(homeRoom))
    }
  }, [dispatch, homeRoom])

  const { diograph } = useSelector((state) => state.diograph)
  const rootDiory = diograph['/']
  useEffect(() => {
    if (rootDiory) {
      dispatch(selectStory(rootDiory))
    }
  }, [dispatch, rootDiory])
}
