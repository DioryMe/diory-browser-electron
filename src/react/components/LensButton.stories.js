import React from 'react'
import { action } from '@storybook/addon-actions'

import LensButton from './LensButton'

export default {
  title: 'Lens button',
  component: LensButton,
}

const diory = {
  image: 'map',
}

const actions = {
  onSelect: action('onSelect'),
  onRemove: action('onRemove'),
}

const lens = { diory, ...actions }

export const initially = () => <LensButton {...lens} />

export const withSelectedLens = () => <LensButton {...lens} isSelected />

export const withFilteredLens = () => <LensButton {...lens} isFiltered />

export const withFilteredAndSelectedLens = () => <LensButton {...lens} isFiltered isSelected />
