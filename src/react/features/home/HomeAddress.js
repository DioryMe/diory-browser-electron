import React from 'react'
import { useSelector } from '../../store'

import { useGetHomeAddressEffect } from './useGetHomeAddressEffect'
import { useSaveHomeAddress } from './useSaveHomeAddress'
import { useHomeDiographEffect } from './useHomeDiographEffect'

import HomeAddressView from './components/HomeAddressView'

export const HomeAddress = () => {
  useGetHomeAddressEffect()
  useHomeDiographEffect()

  // TODO initialiseHomeDiograph()

  const { initializing, address } = useSelector((state) => state.home)
  const { saveHomeAddress } = useSaveHomeAddress()

  return address ? null : <HomeAddressView initializing={initializing} onClick={saveHomeAddress} />
}
