import React from 'react'
import { useStore } from './store'

import { useGetDiograph } from './features/diograph/useGetDiograph'

import Browser from './Browser'
import Welcome from './features/welcome/Welcome'

const Root = () => {
  const [{ folderLocation }] = useStore((state) => state.diograph)

  useGetDiograph()

  if (folderLocation === undefined) {
    return <div>Loading...</div>
  }

  return folderLocation === null ? <Welcome /> : <Browser />
}

export default Root
