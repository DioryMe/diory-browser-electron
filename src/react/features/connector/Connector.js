import React from 'react'
import { useGetHome } from './hooks/useGetHome'
import { useGetRoom } from './hooks/useGetRoom'
import { useSaveRoom } from './hooks/useSaveRoom'

import { useAddRoom } from './tools/useAddRoom'
import { useGenerateDiograph } from './tools/useGenerateDiograph'

const Connector = () => {
  useGetHome()
  useGetRoom()
  useSaveRoom()

  useAddRoom()
  useGenerateDiograph()

  return <div data-testid="connector" />
}

export default Connector
