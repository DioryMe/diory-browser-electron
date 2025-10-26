import React from 'react'
import { action } from '@storybook/addon-actions'
import StoreProvider from '../../../store/StoreProvider'

import { FormModal } from './FormModal'

export default {
  title: 'Form modal',
  component: FormModal,
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

export const initially = () => <FormModal />

export const isShownWithTitle = () => <FormModal {...actions} title="Diory id" />

const diory = {
  text: 'some-text',
}

export const isShownWithDiory = () => <FormModal {...actions} diory={diory} />
