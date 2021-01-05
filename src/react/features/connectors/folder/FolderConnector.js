import React from 'react'

import { useButtons } from '../../buttons'
import { useFocus } from '../../diograph/hooks'

import { useGetRoomEffect } from '../effects/useGetRoomEffect'
import { useSaveRoomEffect } from '../effects/useSaveRoomEffect'
import { useAddConnectionButton } from './buttons/useAddConnectionButton'

import { buttons } from './buttons/buttons'
import { getRoom, saveRoom } from './client'

const FolderConnectorButtons = () => {
  useButtons(buttons)
  useAddConnectionButton()
  return null
}

const FolderConnector = () => {
  const { diory } = useFocus()
  useGetRoomEffect(getRoom, 'file')
  useSaveRoomEffect(saveRoom, 'file')

  return <div data-testid="connector">{!diory && <FolderConnectorButtons />}</div>
}

export default FolderConnector
