import React from 'react'

import { useButtons } from '../buttons/useButtons'

import { useGetRoom } from './hooks/useGetRoom'
import { useSaveRoom } from './hooks/useSaveRoom'
import { useOpenRoom } from './hooks/useOpenRoom'

import { buttons } from './buttons'

const Connector = () => {
  useButtons(buttons)

  useGetRoom()
  useSaveRoom()
  useOpenRoom()

  return <div data-testid="connector" />
}

export default Connector
