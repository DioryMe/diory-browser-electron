import React from 'react'

import { useButtonBar } from './useButtonBar'

import ButtonBarView from './ButtonBarView'

const ButtonBar = () => <ButtonBarView {...useButtonBar()} />

export default ButtonBar
