import React from 'react'
import { action } from '@storybook/addon-actions'

import UpdateView from './UpdateView'

export default {
  title: 'Update view',
  component: UpdateView,
}

const actions = {
  onChange: action('onChange'),
  onDone: action('onDone'),
  onCancel: action('onCancel'),
}

export const initially = () => <UpdateView />

export const isShown = () => <UpdateView {...actions} isShown />

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

export const isShownWithTitle = () => <UpdateView {...actions} isShown title="Diory id" />

export const isShownWithFields = () => <UpdateView {...actions} isShown fields={fields} />
