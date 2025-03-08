import React from 'react'

import { useButtonBar } from './useButtonBar'

import ButtonBar from '../../components/ButtonBar'

export const Buttons = () => <ButtonBar {...useButtonBar()} />
