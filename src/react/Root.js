import React from 'react'

import { useGetHomeAddressEffect } from './features/room/useGetHomeAddressEffect'
import { useGetDiographEffect } from './features/diograph/useGetDiographEffect'

import Welcome from './features/welcome/Welcome'
import Browser from './features/browser/Browser'

const Root = () => {
  useGetHomeAddressEffect()
  useGetDiographEffect()

  return (
    <>
      <Browser />
      <Welcome />
    </>
  )
}

export default Root
