import React from 'react'
import { action } from '@storybook/addon-actions'

import { EditView } from './EditView'

export default {
  title: 'Edit Tool',
  component: EditView,
}

const actions = {
  onChange: action('onChange'),
  onDone: action('onDone'),
  onCancel: action('onCancel'),
}

export const initially = () => <EditView />

export const isShownWithActions = () => <EditView {...actions} isShown />

const diory = {
  id: 'some-id',
  text: 'Some text',
  image: 'Some image url string',
  style: { some: 'style object' },
  location: { some: 'location object' },
  date: 'Some date string',
}

export const isShownWithDiory = () => <EditView isShown diory={diory} />
