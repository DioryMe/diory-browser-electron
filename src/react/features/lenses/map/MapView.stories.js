import React from 'react'
import { StoreProvider } from '../../../store/StoreContext'

import MapView from './MapView'

export default {
  title: 'Map view',
  component: MapView,
  decorators: [
    (Story) => (
      <StoreProvider>
        <Story />
      </StoreProvider>
    ),
  ],
}

const actions = {
  onMapClick: () => {},
  onPopupClick: () => {},
  enableDragging: () => {},
  onDragEnd: () => {},
}

const diory = {
  text: 'some-text',
  latitude: '61',
  longitude: '26',
}

const diorys = [diory]

export const withDiorys = () => <MapView diorys={diorys} diory={diory} {...actions} />
