import React from 'react'

import { useButtons } from '../../buttons'
import { useFocus } from '../../diograph/hooks'

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
  const { diory } = useFocus()
  useGetRoomEffect('file')
  useSaveRoomEffect('file')
  return <div data-testid="connector">{!diory && <FolderConnectorButtons />}</div>
}

export default FolderConnector
