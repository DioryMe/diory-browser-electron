import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from '../../store'

import { useHomeDiographEffect } from './utils/useHomeDiographEffect'
import { useGetHomeAddressEffect } from './utils/useGetHomeAddressEffect'
import { useSaveHomeAddress } from './utils/useSaveHomeAddress'

import { HomeView } from './components/HomeView'

const Home = ({ children }) => {
  useGetHomeAddressEffect()
  useHomeDiographEffect()

  const { loading, address } = useSelector((state) => state.home)
  const { loaded } = useSelector((state) => state.diograph)

  return (
    <HomeView
      showChildren={loaded[address]}
      showButton={!loading && !address}
      onButtonClick={useSaveHomeAddress()}
    >
      {children}
    </HomeView>
  )
}

Home.propTypes = {
  children: PropTypes.node.isRequired,
}

export { Home }
