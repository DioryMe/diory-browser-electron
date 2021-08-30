import React from 'react'

import {useDispatchActions, useStore} from '../../store'
import { useFocus } from '../diograph/hooks'
import {openFocus} from './store'

import GridLens from '../lenses/grid/GridLens'
import Box from 'ui-box'

const Focus = () => {
  const { diory, diorys, reverseDiorys } = useFocus()
  const [{ open }] = useStore((state) => state.focus)
  const { dispatchAction } = useDispatchActions()
  return diory ? (
    <Box position="fixed" height={open ? '100%' : 100} right={0} bottom={0} left={0} overflow="auto" onClick={dispatchAction(openFocus)}>
      <GridLens diory={diory} diorys={diorys} reverseDiorys={reverseDiorys} />
    </Box>
  ) : null
}

export default Focus
