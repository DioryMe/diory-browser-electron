import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import MapView from './MapView'
import { StoreProvider } from '../../../store/StoreContext'
import Fullscreen from '../../../components/Fullscreen'

const mapFixture = {
  someDioryId: {
    id: 'someDioryId',
    text: 'someDioryId name',
    image: 'https://i.stack.imgur.com/khVpE.png',
    latitude: '62',
    longitude: '24',
    links: {
      linkedDioryId1: { id: 'linkedDioryId1' },
      bidirectionalLinkedDioryId2: { id: 'bidirectionalLinkedDioryId2' },
    },
  },
  linkedDioryId1: {
    id: 'linkedDioryId1',
    text: 'linkedDioryId1 name',
    latitude: '62',
    longitude: '25',
  },
  bidirectionalLinkedDioryId2: {
    id: 'bidirectionalLinkedDioryId2',
    text: 'bidirectionalLinkedDioryId2 name',
    latitude: '62',
    longitude: '23',
    links: {
      someDioryId: { id: 'someDioryId' },
    },
  },
}

export default {
  title: 'Map view',
  component: MapView,
  decorators: [
    (Story) => (
      <StoreProvider>
        <DndProvider backend={HTML5Backend}>
          <Fullscreen marginTop={48} zIndex={-1}>
            <Story />
          </Fullscreen>
        </DndProvider>
      </StoreProvider>
    ),
  ],
}

const props = {
  diory: mapFixture.someDioryId,
  diorys: [mapFixture.linkedDioryId1, mapFixture.bidirectionalLinkedDioryId2],
  onPopupClick: () => {},
  onMapClick: () => {},
  onDragEnd: () => {},
  enableDragging: () => {},
  fitToBounds: false,
  onBoundsChange: () => {},
}

export const withDiorys = () => <MapView {...props} />
