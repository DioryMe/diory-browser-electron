import React from 'react'
import { StoreProvider } from '../../../store/StoreContext'

import TimelineView from './TimelineView'

export default {
  title: 'Timeline view',
  component: TimelineView,
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
  date: '2014-09-20T17:44:52.000Z',
  latitude: '61',
  longitude: '26',
}

const diorys = [diory]

export const withDiorys = () => <TimelineView diorys={diorys} diory={diory} {...actions} />
