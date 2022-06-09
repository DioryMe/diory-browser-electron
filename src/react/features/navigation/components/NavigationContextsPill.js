import React from 'react'
import { Pane, Pill, SelectMenu } from 'evergreen-ui'

import { useDispatchActions } from '../../../store'
import { useDiograph } from '../../diograph/useDiograph'

import { selectStory } from '../navigationActions'

const useNavigationContexts = () => {
  const { contexts } = useDiograph()
  const { dispatch } = useDispatchActions()

  return {
    contexts: contexts.map((diory) => ({ label: diory.text, value: diory.id })),
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
