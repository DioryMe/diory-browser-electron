import React from 'react'
import { useSelector } from '../../store'

import { useHomeDiographEffect } from './useHomeDiographEffect'
import { useGetHomeAddressEffect } from './useGetHomeAddressEffect'
import { useSaveHomeAddress } from './useSaveHomeAddress'

import { HomeView } from './HomeView'

export const Home = ({ children }) => {
  useGetHomeAddressEffect()
  useHomeDiographEffect()

  const { loading, address } = useSelector((state) => state.home)
  const { loaded } = useSelector((state) => state.diograph)

  return <HomeView
    showChildren={loaded[address]}
    showButton={!loading && !address}
    onButtonClick={useSaveHomeAddress()}
  >
    {children}
  </HomeView>
}
