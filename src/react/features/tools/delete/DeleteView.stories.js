import React from 'react'
import { action } from '@storybook/addon-actions'
import { StoreProvider } from '../../../store/StoreContext'

import DeleteView from './DeleteView'

export default {
  title: 'Delete view',
  component: DeleteView,
  decorators: [
    (Story) => (
      <StoreProvider>
        <Story />
      </StoreProvider>
    ),
  ],
}

const actions = {
  onDone: action('onDone'),
}

export const initially = () => <DeleteView />

export const isShown = () => <DeleteView {...actions} isShown />
