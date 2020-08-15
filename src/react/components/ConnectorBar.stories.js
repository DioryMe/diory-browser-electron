import React from 'react'
import { action } from '@storybook/addon-actions'

import ConnectorBar from './ConnectorBar'

export default {
  title: 'Connector bar',
  component: ConnectorBar,
}

const actions = {
  onClick: action('onClick'),
}

export const withOneConnector = () => (
  <ConnectorBar
    connectors={[
      {
        id: 'connector-1',
        data: {
          icon: 'folder-close',
        },
        onClick: actions.onClick,
      },
    ]}
  />
)

export const withSeveralConnectors = () => (
  <ConnectorBar
    connectors={[
      {
        id: 'connector-1',
        data: {
          icon: 'folder-close',
        },
        onClick: actions.onClick,
      },
      {
        id: 'connector-2',
        data: {
          icon: 'box',
        },
        onClick: actions.onClick,
      },
    ]}
  />
)
