import React from 'react'

import { useGetDioryFolderLocation } from './features/settings/useGetDioryFolderLocation'
import { useDiographEffects } from './features/diograph/useDiographEffects'

import Welcome from './features/welcome/Welcome'
import Browser from './features/browser/Browser'

const Root = () => {
  useGetDioryFolderLocation()
  useDiographEffects()

  return (
    <>
      <Browser />
      <Welcome />
    </>
  )
}

export default Root
