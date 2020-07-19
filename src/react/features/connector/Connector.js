import React from 'react'
import { useGetRoom } from './hooks/useGetRoom'
import { useSaveRoom } from './hooks/useSaveRoom'

import { useOpenRoom } from './hooks/useOpenRoom'

import { useButtons } from './buttons'

const Connector = () => {
  useGetRoom()
  useSaveRoom()
  useOpenRoom()

  useButtons()

  return <div data-testid="connector" />
}

export default Connector
