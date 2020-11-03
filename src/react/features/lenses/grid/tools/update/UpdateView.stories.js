import React from 'react'
import { action } from '@storybook/addon-actions'
import { StoreProvider } from '../../../../../store/StoreContext'

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

export const isShown = () => <UpdateView {...actions} isShown />

export const isShownWithTitle = () => <UpdateView {...actions} isShown title="Diory id" />

const diory = {
  text: 'some-text',
}

export const isShownWithDiory = () => <UpdateView {...actions} isShown diory={diory} />
