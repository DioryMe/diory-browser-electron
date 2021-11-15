import React from 'react'
import { Pane, Pill, SelectMenu } from 'evergreen-ui'

import { useDispatchActions } from '../../../store'
import { useDiograph } from '../../diograph/useDiograph'

import { selectStory } from '../actions'

const useNavigationContexts = () => {
  const { context, contexts } = useDiograph()
  const { dispatch } = useDispatchActions()
  const otherContexts = contexts
    .filter(({ id }) => id !== context.id)
    .map((diory) => ({ label: diory.text, value: diory.id }))

  return {
    contexts: otherContexts,
    onContextLick: ({ value }) => dispatch(selectStory({ id: value })),
  }
}

const NavigationContextsPill = () => {
  const { contexts, onContextLick } = useNavigationContexts()
  return contexts.length ? (
    <Pane alignSelf="center">
      <SelectMenu
        title="Select story:"
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

export default NavigationContextsPill
