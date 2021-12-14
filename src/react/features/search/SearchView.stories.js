import React from 'react'
import { action } from '@storybook/addon-actions'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { StoreProvider } from '../../store/StoreContext'

import SearchView from './SearchView'

export default {
  title: 'Search view',
  component: SearchView,
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
  onDone: action('onDone'),
  onDrop: action('onDrop'),
}

export const initially = () => <SearchView width={300} query="" results={[]} {...actions} />

export const withQuery = () => (
  <SearchView width={300} query="Some query" results={[]} {...actions} />
)

const results = [
  {
    text: 'Some diory',
  },
  {
    text: 'Other diory',
  },
]

export const withSearchResults = () => (
  <SearchView width={300} query="Some query" results={results} {...actions} />
)
