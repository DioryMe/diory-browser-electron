import React from 'react'
import { action } from '@storybook/addon-actions'

import TextInput from './TextInput'

export default {
  title: 'TextInput',
  component: TextInput,
}

const actions = {
  onFocus: action('onFocus'),
  onChange: action('onChange'),
  onBlur: action('onBlur'),
}

const texts = {
  label: 'A text input',
  description: 'This is a description.',
  hint: 'This is a hint.',
  placeholder: 'Placeholder text',
}

export const withTexts = () => <TextInput {...actions} {...texts} />

export const required = () => <TextInput {...actions} {...texts} required />

export const invalid = () => (
  <TextInput
    {...actions}
    {...texts}
    required
    isInvalid={true}
    validationMessage="This field is required"
  />
)
