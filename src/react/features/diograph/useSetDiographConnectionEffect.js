import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useDispatchActions } from '../../store'
import { useNavigation } from '../navigation/useNavigation'
import { useDiograph } from './useDiograph'
import { setDiographConnection } from '../home/homeActions'

const findDioryConnection = (dioryId, diograph) =>
  Object.entries(diograph)
    .filter(([key, { id }]) => key !== id)
    .find(([key, { id }]) => id === dioryId && key !== '/')

const useDioryConnection = () => {
  const { storyId } = useNavigation()
  const { diograph } = useDiograph()
  const { connection: oldConnection } = useSelector((state) => state.home)

  let [connection] = findDioryConnection(storyId, diograph) || []
  if (connection && connection.startsWith('/')) {
    connection = oldConnection + connection
  }
  return { connection }
}

export const useSetDiographConnectionEffect = () => {
  const { connection } = useDioryConnection()
  console.log(connection)
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (connection) {
      dispatch(setDiographConnection(connection))
    }
  }, [dispatch, connection])
}
