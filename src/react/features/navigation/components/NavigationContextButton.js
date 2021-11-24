import React from 'react'
import { Button, Pane } from 'evergreen-ui'

import { useDispatchActions } from '../../../store'
import { useDiograph } from '../../diograph/useDiograph'

import { selectStory } from '../navigationActions'

const NavigationContextButton = () => {
  const { context } = useDiograph()
  const { dispatch } = useDispatchActions()
  return context ? (
    <Pane alignSelf="center">
      <Button appearance="minimal" onClick={() => context && dispatch(selectStory(context))}>
        {context.text}
      </Button>
    </Pane>
  ) : null
}

export default NavigationContextButton
