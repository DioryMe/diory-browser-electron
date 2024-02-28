import React from 'react'
import { action } from '@storybook/addon-actions'
import StoreProvider from '../../../store/StoreProvider'

import UpdateView from './UpdateView'

export default {
  title: 'Update view',
  component: UpdateView,
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

export const initially = () => <UpdateView />

export const isShownWithTitle = () => <UpdateView {...actions} title="Diory id" />

const diory = {
  text: 'some-text',
}

export const isShownWithDiory = () => <UpdateView {...actions} diory={diory} />
