import React from 'react'

import { useButtonBar } from './components/useButtonBar'

import ButtonBar from './components/ButtonBar'

export const Buttons = () => <ButtonBar {...useButtonBar()} />
