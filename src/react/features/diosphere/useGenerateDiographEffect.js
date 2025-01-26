import { useEffect } from 'react'

import { useDispatchActions, useSelector } from '../../store'

import { generateDiograph } from '../diograph/diographActions'

const findDioryConnection = (dioryId, diograph) =>
  Object.entries(diograph)
    .filter(([key, { id }]) => key !== id)
    .find(([, { id }]) => id === dioryId)

const useDioryConnection = () => {
  const { storyId, diograph = {} } = useSelector((state) => state.navigation.diosphere) || {}

  const [dioryConnection] = findDioryConnection(storyId, diograph) || []
  const [client, ...addressArray] = (dioryConnection || '').split('/') || []

  return {
    client,
    address: addressArray.join('/'),
  }
}

export const useGenerateDiographEffect = () => {
  const { client, address } = useDioryConnection()

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (client && address) {
      dispatch(generateDiograph({ client, address }))
    }
  }, [dispatch, client, address])
}
