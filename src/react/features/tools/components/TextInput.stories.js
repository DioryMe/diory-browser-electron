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

export const initially = () => <TextInput {...actions} />

export const withValue = () => <TextInput value="Some value" {...actions} />

export const withTexts = () => <TextInput {...texts} {...actions} />

export const withRequiredIcon = () => <TextInput label={texts.label} required {...actions} />

export const withInvalidNotifications = () => (
  <TextInput label={texts.label} isInvalid validationMessage="This field is invalid" {...actions} />
)

export const withJsonValidation = () => <TextInput format="object" {...actions} />

export const withObjectValue = () => (
  <TextInput value={{ some: 'object' }} format="object" {...actions} />
)
