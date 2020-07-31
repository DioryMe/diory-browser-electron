import React from 'react'
import { action } from '@storybook/addon-actions'

import Button from './Button'

export default {
  title: 'Button',
  component: Button,
}

const actions = {
  onClick: action('onClick'),
}

export const initially = () => <Button {...actions} />

export const withIcon = () => (
  <Button
    data={{
      icon: 'edit',
    }}
    {...actions}
  />
)
export const active = () => (
  <Button
    data={{
      icon: 'edit',
    }}
    active
    {...actions}
  />
)
