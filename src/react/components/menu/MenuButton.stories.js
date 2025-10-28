import React from 'react'
import { action } from '@storybook/addon-actions'

import MenuButton from './MenuButton'

export default {
  title: 'Lens button',
  component: MenuButton,
}

const diory = {
  image: 'map',
}

const actions = {
  onSelect: action('onSelect'),
  onRemove: action('onRemove'),
}

const lens = { diory, ...actions }

export const initially = () => <MenuButton {...lens} />

export const withSelectedLens = () => <MenuButton {...lens} isSelected />

export const withFilteredLens = () => <MenuButton {...lens} isFiltered />

export const withFilteredAndSelectedLens = () => <MenuButton {...lens} isFiltered isSelected />
