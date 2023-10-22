import React from 'react'
import { action } from '@storybook/addon-actions'

import NavigationButton from './NavigationButton'

export default {
  title: 'Lens button',
  component: NavigationButton,
}

const diory = {
  image: 'map',
}

const actions = {
  onSelect: action('onSelect'),
  onRemove: action('onRemove'),
}

const lens = { diory, ...actions }

export const initially = () => <NavigationButton {...lens} />

export const withSelectedLens = () => <NavigationButton {...lens} isSelected />

export const withFilteredLens = () => <NavigationButton {...lens} isFiltered />

export const withFilteredAndSelectedLens = () => (
  <NavigationButton {...lens} isFiltered isSelected />
)
