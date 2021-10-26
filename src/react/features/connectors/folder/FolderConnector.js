import React from 'react'

import { useStore } from '../../../store'
import { useButtons } from '../../buttons'

import { useGetRoomEffect } from '../effects/useGetRoomEffect'
import { useSaveRoomEffect } from '../effects/useSaveRoomEffect'
import { useAddConnectionButton } from './buttons/useAddConnectionButton'

import { buttons } from './buttons/buttons'

const FolderConnectorButtons = () => {
  useButtons(buttons)
  useAddConnectionButton()
  return null
}

const FolderConnector = () => {
  const [{ loaded }] = useStore((state) => state.diograph)
  useGetRoomEffect('file')
  useSaveRoomEffect('file')
  return <div data-testid="connector">{loaded && <FolderConnectorButtons />}</div>
}

export default FolderConnector
