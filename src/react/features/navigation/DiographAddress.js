import React from 'react'
import { Pane } from 'evergreen-ui'

import { useDispatchActions } from '../../store'
import { useDiories } from '../diograph/utils/useDiories'

import { selectStory } from './navigationActions'

import { MenuDropdown } from '../../components/MenuDropdown'
import { MenuItem } from '../../components/MenuItem'
import { useContextDiories } from '../diograph/utils/useContextDiories'
import { useHomeButton } from './useHomeButton'

const NavigationDivider = () => (
  <Pane color="white" fontSize={12} borderRadius={16} margin={6} alignSelf="center">
    /
  </Pane>
)

const DiographAddress = () => {
  const { story, memories } = useDiories()
  const { stories, context, contexts } = useContextDiories()

  const { dispatch, dispatchAction } = useDispatchActions()
  return (
    <>
      <MenuItem fontWeight="bold" {...useHomeButton()} />
      <NavigationDivider />
      {context && (
        <>
          <MenuItem {...context} onClick={() => dispatch(selectStory(context))} />
          <MenuDropdown diory={context} diories={contexts} onClick={dispatchAction(selectStory)} />
          <NavigationDivider />
        </>
      )}
      {story && (
        <>
          <MenuItem {...story} color="white" pointerEvents="none" />
          <MenuDropdown diory={story} diories={stories} onClick={dispatchAction(selectStory)} />
        </>
      )}

      {memories.length > 1 && (
        <>
          <NavigationDivider />
          <MenuDropdown diories={memories} onClick={dispatchAction(selectStory)} />
        </>
      )}
    </>
  )
}

export { DiographAddress }
