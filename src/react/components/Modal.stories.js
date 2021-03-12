import React from 'react'
import { action } from '@storybook/addon-actions'

import Modal from './Modal'

export default {
  title: 'Modal',
  component: Modal,
  parameters: {
    chromatic: { delay: 3000 },
  },
}

const actions = {
  onCancel: action('onCancel'),
  onDone: action('onDone'),
}

export const isShown = () => (
  <div>
    <Modal {...actions} isShown />
  </div>
)

export const isNotShown = () => (
  <div>
    <Modal {...actions} isShown={false} />
  </div>
)

export const withTitle = () => (
  <div>
    <Modal isShown title="Modal title" {...actions} />
  </div>
)

export const withContent = () => (
  <div>
    <Modal isShown {...actions}>
      <div>Modal content</div>
    </Modal>
  </div>
)
