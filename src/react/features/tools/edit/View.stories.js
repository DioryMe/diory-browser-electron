import React from 'react'
import { action } from '@storybook/addon-actions'

import { View } from './View'

export default {
  title: 'Edit Tool',
  component: View,
}

const actions = {
  onChange: action('onChange'),
  onDone: action('onDone'),
  onCancel: action('onCancel'),
}

export const initially = () => <View {...actions} />

export const isShown = () => <View {...actions} isShown />

const diory = {
  id: 'some-id',
  text: 'Some text',
  image: 'Some image url string',
  style: { some: 'style object' },
  location: { some: 'location object' },
  date: 'Some data string',
}

export const withDiory = () => <View {...actions} isShown diory={diory} />
