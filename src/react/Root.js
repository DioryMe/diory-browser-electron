import React from 'react'

import { useStore } from './store'
import { useGetDioryLocation } from './features/settings/useGetDioryLocation'
import { useDiographEffects } from './features/diograph/useDiographEffects'

import Welcome from './features/welcome'
import Settings from './features/settings'
import Browser from './Browser'

const Root = () => {
  useGetDioryLocation()
  useDiographEffects()

  const [{ showSettingsBar }] = useStore((state) => state.settings)
  return (
    <>
      <Settings />
      <Browser left={showSettingsBar ? 300 : 0} />
      <Welcome />
    </>
  )
}

export default Root
