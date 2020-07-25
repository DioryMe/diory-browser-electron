import React from 'react'
import { action } from '@storybook/addon-actions'

import ButtonBarView from './ButtonBarView'

export default {
  title: 'Button bar',
  component: ButtonBarView,
}

const actions = {
  onClick: action('onClick'),
}

export const initially = () => <ButtonBarView />

export const withOneButton = () => (
  <ButtonBarView
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
  <ButtonBarView
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
  <ButtonBarView
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
