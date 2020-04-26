import React from 'react'
import { useGetHome } from './hooks/useGetHome'
import { useGetRoom } from './hooks/useGetRoom'
import { useSaveRoom } from './hooks/useSaveRoom'

import { useAddRoom } from './tools/useAddRoom'
import { useOpenFolder } from './tools/useOpenFolder'

const Connector = () => {
  useGetHome()
  useGetRoom()
  useSaveRoom()

  useAddRoom()
  useOpenFolder()

  return <div data-testid="connector" />
}

export default Connector
