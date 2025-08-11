import React from 'react'
import { useSelector } from '../../store'

import { useHomeDiographEffect } from './useHomeDiographEffect'
import { useGetHomeAddressEffect } from './useGetHomeAddressEffect'
import { useSaveHomeAddress } from './useSaveHomeAddress'

import { HomeWelcome } from './components/HomeWelcome'
import { HomeAddressButton } from './components/HomeAddressButton'

export const Home = ({ children }) => {
  useGetHomeAddressEffect()
  useHomeDiographEffect()

  const { loading, address } = useSelector((state) => state.home)
  const { loaded } = useSelector((state) => state.diograph)

  const { saveHomeAddress } = useSaveHomeAddress()
  return loaded[address] ? (
    children
  ) : (
    <HomeWelcome>
      {!loading && !address && <HomeAddressButton onClick={saveHomeAddress} />}
    </HomeWelcome>
  )
}
