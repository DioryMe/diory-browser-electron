import React from 'react'

import { useButtonBar } from './useButtonBar'

import ButtonBar from '../../components/ButtonBar'

const Buttons = () => <ButtonBar {...useButtonBar()} />

export default Buttons
