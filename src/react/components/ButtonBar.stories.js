import React from 'react'
import { action } from '@storybook/addon-actions'

import ButtonBar from './ButtonBar'

export default {
  title: 'Button bar',
  component: ButtonBar,
}

const actions = {
  onClick: action('onClick'),
}

export const initially = () => <ButtonBar />

export const withOneButton = () => (
  <ButtonBar
    buttons={[
      {
        id: 'tools',
        data: {
          icon: 'edit',
        },
        onClick: actions.onClick,
      },
    ]}
  />
)

export const withSeveralButtonsClosed = () => (
  <ButtonBar
    buttons={[
      {
        id: 'tools',
        data: {
          icon: 'wrench',
        },
        onClick: actions.onClick,
      },
    ]}
  />
)

export const withSeveralButtonsOpen = () => (
  <ButtonBar
    buttons={[
      {
        id: 'tools',
        data: {
          icon: 'edit',
        },
        onClick: actions.onClick,
      },
      {
        id: 'tools',
        data: {
          icon: 'plus',
        },
        onClick: actions.onClick,
      },
    ]}
  />
)
