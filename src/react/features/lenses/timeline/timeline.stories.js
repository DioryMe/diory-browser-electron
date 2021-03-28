import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import TimelineView from './TimelineView'
import { StoreProvider } from '../../../store/StoreContext'
import Fullscreen from '../../../components/Fullscreen'

const timelineFixture = {
  someDioryId: {
    id: 'someDioryId',
    text: 'someDioryId name',
    image: 'https://i.stack.imgur.com/khVpE.png',
    links: {
      linkedDioryId1: { id: 'linkedDioryId1' },
      bidirectionalLinkedDioryId2: { id: 'bidirectionalLinkedDioryId2' },
    },
  },
  linkedDioryId1: {
    id: 'linkedDioryId1',
    text: 'linkedDioryId1 name',
    date: '2020-01-01',
  },
  bidirectionalLinkedDioryId2: {
    id: 'bidirectionalLinkedDioryId2',
    text: 'bidirectionalLinkedDioryId2 name',
    date: '2020-02-01',
    links: {
      someDioryId: { id: 'someDioryId' },
    },
  },
}

export default {
  title: 'Timeline view',
  component: TimelineView,
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
  diory: timelineFixture.someDioryId,
  diorys: [timelineFixture.linkedDioryId1, timelineFixture.bidirectionalLinkedDioryId2],
  onPopupClick: () => {},
  onMapClick: () => {},
  onDragEnd: () => {},
  enableDragging: () => {},
  fitToBounds: false,
  onBoundsChange: () => {},
}

export const withDiorys = () => <TimelineView {...props} />
