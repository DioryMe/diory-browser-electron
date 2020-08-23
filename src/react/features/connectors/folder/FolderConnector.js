import React from 'react'

import { useButtons } from '../../buttons'

import { useGetRoomEffect } from '../effects/useGetRoomEffect'
import { useSaveRoomEffect } from '../effects/useSaveRoomEffect'
import { useAddConnectionButton } from './buttons/useAddConnectionButton'

import { buttons } from './buttons/buttons'
import { getRoom, saveRoom } from './client'

const FolderConnector = () => {
  useButtons(buttons)
  useAddConnectionButton()

  useGetRoomEffect(getRoom, 'file')
  useSaveRoomEffect(saveRoom, 'file')

  return <div data-testid="connector" />
}

export default FolderConnector
