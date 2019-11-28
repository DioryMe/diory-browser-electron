import React from 'react';
import Channels from './Channels'
import LensProvider from './lenses/LensProvider'

const Providers = ({children}) =>
  <Channels>
    <LensProvider>
      {children}
    </LensProvider>
  </Channels>

export default Providers
