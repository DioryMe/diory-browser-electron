import React from 'react'
import { action } from '@storybook/addon-actions'

import Modal from './Modal'

export default {
  title: 'Modal',
  component: Modal,
}

const actions = {
  onCancel: action('onCancel'),
  onDone: action('onDone'),
}

export const isShown = () => (
  <div>
    <Modal {...actions} isShown={true}>
      <div>Modal content</div>
    </Modal>
  </div>
)

export const isNotShown = () => (
  <div>
    <Modal {...actions} isShown={false}>
      <div>Modal content</div>
    </Modal>
  </div>
)
