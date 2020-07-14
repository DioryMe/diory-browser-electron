import React from 'react'
import { action } from '@storybook/addon-actions'

import TextInput from './TextInput'

export default {
  title: 'TextInput',
  component: TextInput,
}

const texts = {
  label: 'A text input',
  description: 'This is a description.',
  hint: 'This is a hint.',
  placeholder: 'Placeholder text',
}

const actions = {
  onFocus: action('onFocus'),
  onChange: action('onChange'),
  onBlur: action('onBlur'),
}

export const withTexts = () => <TextInput {...texts} {...actions} />

export const withoutTexts = () => <TextInput {...actions} />

export const required = () => <TextInput label={texts.label} required {...actions} />

export const invalid = () => (
  <TextInput
    label={texts.label}
    required
    isInvalid
    validationMessage="This field is required"
    {...actions}
  />
)
