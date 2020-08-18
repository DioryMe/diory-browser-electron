import React from 'react'
import Button from '../../../components/Button'
import { useDispatch } from '../../../store'

import { useButtons } from '../../buttons'
import { updateConnection } from '../actions'
import { useConnections } from '../useConnections'

import { useGetRoomEffect } from './effects/useGetRoomEffect'
import { useSaveRoomEffect } from './effects/useSaveRoomEffect'
import { useAddConnectionButton } from './buttons/useAddConnectionButton'

import { buttons } from './buttons/buttons'

const useFolderConnector = () => {
  const { connections } = useConnections('file')

  const [active] = connections.map(({ connected }) => connected)

  const dispatch = useDispatch()
  return {
    button: {
      id: 'folder-connector',
      data: {
        icon: 'folder-close',
      },
      active,
      onClick: () =>
        connections.forEach(({ connected, ...connection }) =>
          dispatch(updateConnection({ ...connection, connect: !connected, connected: false }))
        ),
    },
  }
}

const FolderConnector = () => {
  useButtons(buttons)
  useAddConnectionButton()

  useGetRoomEffect()
  useSaveRoomEffect()

  const { button } = useFolderConnector()

  return <Button key={button.id} {...button} />
}

export default FolderConnector
