import React from 'react'
import { useStore } from './store'

import { useGetDiographEffect } from './features/diograph/useGetDiographEffect'
import { useSaveDiographEffect } from './features/diograph/useSaveDiographEffect'

import Browser from './Browser'
import Welcome from './features/welcome/Welcome'

const Root = () => {
  const [{ folderLocation }] = useStore((state) => state.diograph)

  useGetDiographEffect()
  useSaveDiographEffect()

  if (folderLocation === undefined) {
    return <div>Loading...</div>
  }

  return folderLocation === null ? <Welcome /> : <Browser />
}

export default Root
