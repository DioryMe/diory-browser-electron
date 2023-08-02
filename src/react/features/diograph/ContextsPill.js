import React from 'react'
import { Pane, Pill, SelectMenu } from 'evergreen-ui'

import { useDispatchActions } from '../../store'
import { useDiograph } from './useDiograph'

import { selectContext } from '../navigation/navigationActions'

const useContextsPill = () => {
  const { context, contexts } = useDiograph()
  const { dispatch } = useDispatchActions()
  const otherContexts = contexts
    .filter(({ id }) => id !== context.id)
    .map((diory) => ({ label: diory.text, value: diory.id }))

  return {
    contexts: otherContexts,
    onContextLick: ({ value }) => dispatch(selectContext({ id: value })),
  }
}

const ContextsPill = () => {
  const { contexts, onContextLick } = useContextsPill()
  return contexts.length ? (
    <Pane alignSelf="center">
      <SelectMenu
        title="Select context:"
        options={contexts}
        hasFilter={false}
        maxWidth={200}
        onSelect={onContextLick}
      >
        <Pill alignSelf="center" margin={8} color="red" cursor="pointer">
          {contexts.length}
        </Pill>
      </SelectMenu>
    </Pane>
  ) : null
}

export default ContextsPill
