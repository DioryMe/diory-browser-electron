import React from 'react'

import { useGetDioryFolderLocation } from './features/settings/useGetDioryFolderLocation'
import { useDiographEffects } from './features/diograph/useDiographEffects'

import Welcome from './features/welcome'
import Browser from './Browser'

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
