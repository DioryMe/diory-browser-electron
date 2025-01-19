import { useEffect } from 'react'

import { useDispatchActions, useSelector } from '../../store'

import { generateDiograph, getDiograph } from './diosphereActions'

const findDioryConnection = (dioryId, diograph) =>
  Object.entries(diograph)
    .filter(([key, { id }]) => key !== id)
    .find(([, { id }]) => id === dioryId)

const useDioryConnection = () => {
  const { storyId, diograph } = useSelector((state) => state.diosphere)

  const [dioryConnection] = findDioryConnection(storyId, diograph) || []
  const [client, ...addressArray] = (dioryConnection || '').split('/') || []

  return {
    client,
    address: addressArray.join('/'),
  }
}

export const useDiosphereEffect = () => {
  const { client, address } = useSelector((state) => state.home)

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (client && address) {
      dispatch(getDiograph({ client, address: `${address}/diosphere` }))
    }
  }, [dispatch, client, address])
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
