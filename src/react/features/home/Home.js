import React from 'react'
import { useSelector } from '../../store'

import { useGetHomeAddressEffect } from './useGetHomeAddressEffect'
import { useSaveHomeAddress } from './useSaveHomeAddress'
import { useHomeDiographEffect } from './useHomeDiographEffect'

import HomeView from './HomeView'

export const Home = () => {
  useGetHomeAddressEffect()
  useHomeDiographEffect()

  // TODO initialiseHomeDiograph()

  const { initializing, address } = useSelector((state) => state.home)
  const { saveHomeAddress } = useSaveHomeAddress()

  return address ? null : <HomeView initializing={initializing} onClick={saveHomeAddress} />
}
