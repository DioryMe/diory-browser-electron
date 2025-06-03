import React from 'react'
import { useSelector } from '../../store'
import { useGetHomeAddressEffect } from './useGetHomeAddressEffect'
import { useHomeDiographEffect } from './useHomeDiographEffect'

import HomeView from './HomeView'
import { useSaveHomeAddress } from './useSaveHomeAddress'

export const Home = () => {
  useGetHomeAddressEffect()
  useHomeDiographEffect()

  // TODO initialiseHomeDiograph()

  const { initializing, address } = useSelector((state) => state.home)
  const { onClick } = useSaveHomeAddress()

  return address ? null : <HomeView initializing={initializing} onClick={onClick} />
}
