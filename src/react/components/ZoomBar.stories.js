import React from 'react'
import { action } from '@storybook/addon-actions'

import ZoomBar from './ZoomBar'

export default {
  title: 'Zoom bar',
  component: ZoomBar,
}

const actions = {
  onClick: action('onClick'),
}

export const withPlusAndMinusButtons = () => (
  <ZoomBar
    buttons={[
      {
        id: 'plus',
        data: {
          icon: 'plus',
        },
        onClick: actions.onClick,
      },
      {
        id: 'minus',
        data: {
          icon: 'minus',
        },
        onClick: actions.onClick,
      },
    ]}
  />
)
