import React from 'react'

import { useButtons } from '../../buttons'

import { useGetRoomEffect } from './effects/useGetRoomEffect'
import { useSaveRoomEffect } from './effects/useSaveRoomEffect'
import { useOpenRoomButton } from './buttons/useOpenRoomButton'

import { buttons } from './buttons/buttons'

const FolderConnector = () => {
  useButtons(buttons)
  useOpenRoomButton()

  useGetRoomEffect()
  useSaveRoomEffect()

  return <div data-testid="connector" />
}

export default FolderConnector
