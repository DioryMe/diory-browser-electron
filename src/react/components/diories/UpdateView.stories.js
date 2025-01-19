import React from 'react'
import { action } from '@storybook/addon-actions'
import StoreProvider from '../../store/StoreProvider'

import UpdateDioryView from './UpdateDioryView'

export default {
  title: 'Update view',
  component: UpdateDioryView,
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

export const initially = () => <UpdateDioryView />

export const isShownWithTitle = () => <UpdateDioryView {...actions} title="Diory id" />

const diory = {
  text: 'some-text',
}

export const isShownWithDiory = () => <UpdateDioryView {...actions} diory={diory} />
