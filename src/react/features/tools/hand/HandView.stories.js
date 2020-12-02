import React from 'react'
import { action } from '@storybook/addon-actions'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { StoreProvider } from '../../../store/StoreContext'

import HandView from './HandView'

export default {
  title: 'Hand view',
  component: HandView,
  decorators: [
    (Story) => (
      <StoreProvider>
        <DndProvider backend={HTML5Backend}>
          <Story />
        </DndProvider>
      </StoreProvider>
    ),
  ],
}

const actions = {
  onDrop: action('onDrop'),
}

export const initially = () => <HandView />

const diorys = [
  {
    text: 'some-diory',
  },
  {
    text: 'other-diory',
  },
]

export const withDiorys = () => <HandView {...actions} diorys={diorys} />
