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
  parameters: {
    chromatic: { delay: 5000 },
  },
}

const actions = {
  onDone: action('onDone'),
}

const diory = {
  text: 'some-diory',
  links: {
    'some-file-name': { id: 'some-linked-diory-id' },
    'some-file-name2': { id: 'some-linked-diory-id2' },
  },
}

export const initially = () => <DeleteView />

export const withDiory = () => <DeleteView {...actions} diory={diory} />

export const withLink = () => <DeleteView {...actions} links={diory.links} />

export const withDioryAndLink = () => <DeleteView {...actions} diory={diory} links={diory.links} />
