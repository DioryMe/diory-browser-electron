import React from 'react'
import { useGetHome } from './hooks/useGetHome'
import { useGetRoom } from './hooks/useGetRoom'
import { useSaveHome } from './hooks/useSaveHome'
import { useSaveRoom } from './hooks/useSaveRoom'

import { useAddRoom } from './tools/useAddRoom'

const Connector = () => {
  useGetHome()
  useSaveHome()
  useGetRoom()
  useSaveRoom()

  useAddRoom()

  return <div data-testid="connector" />
}

export default Connector
