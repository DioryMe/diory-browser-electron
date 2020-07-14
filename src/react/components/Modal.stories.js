import React from 'react'
import { action } from '@storybook/addon-actions'

import Modal from './Modal'

const ModalWithActions = (props) => (
  <Modal onCancel={action('cancel clicked')} onDone={action('done clicked')} {...props} />
)

export default {
  title: 'Modal',
  component: ModalWithActions,
}

export const isShown = () => (
  <div>
    <ModalWithActions isShown={true}>
      <div>Modal content</div>
    </ModalWithActions>
  </div>
)

export const isNotShown = () => (
  <div>
    <ModalWithActions isShown={false}>
      <div>Modal content</div>
    </ModalWithActions>
  </div>
)
