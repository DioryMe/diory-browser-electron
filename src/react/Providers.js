import React from 'react';
import Channels from './components/Channels'
import LensProvider from './components/lenses/LensProvider'
import { StoreProvider } from './store'

const Providers = ({children}) =>
  <Channels>
    <StoreProvider>
      <LensProvider>
        {children}
      </LensProvider>
    </StoreProvider>
  </Channels>

export default Providers
