import React from 'react'
import Button from '../../../components/Button'
import { useDispatch } from '../../../store'
import { updateConnection } from '../actions'
import { useConnections } from '../useConnections'

import { useIpfsFactory } from './client/useIpfsFactory'

import { useGetRoomEffect } from './effects/useGetRoomEffect'
import { useSaveRoomEffect } from './effects/useSaveRoomEffect'

const useIpfsConnector = () => {
  const { connections } = useConnections('ipfs')

  const [active] = connections.map(({ connected }) => connected)

  const dispatch = useDispatch()
  return {
    button: {
      id: 'ipfs-connector',
      data: {
        icon: 'box',
      },
      active,
      onClick: () =>
        connections.forEach(({ connected, ...connection }) =>
          dispatch(updateConnection({ ...connection, connect: !connected, connected: false }))
        ),
    },
  }
}

const IpfsConnector = () => {
  const { isIpfsReady } = useIpfsFactory()
  useGetRoomEffect(isIpfsReady)
  useSaveRoomEffect(isIpfsReady)

  const { button } = useIpfsConnector()

  return <Button key={button.id} {...button} />
}

export default IpfsConnector
