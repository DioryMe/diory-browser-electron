import React from 'react'
import { action } from '@storybook/addon-actions'

import EditView from './EditView'

export default {
  title: 'Edit view',
  component: EditView,
}

const actions = {
  onChange: action('onChange'),
  onDone: action('onDone'),
  onCancel: action('onCancel'),
}

export const initially = () => <EditView />

export const isShown = () => <EditView {...actions} isShown />

const fields = [
  {
    label: 'String field',
    key: 'string',
    format: 'string',
    value: 'Some string',
  },
  {
    label: 'Object field',
    key: 'object',
    format: 'object',
    value: { some: 'object' },
  },
]

export const isShownWithFields = () => <EditView {...actions} isShown fields={fields} />
