import React from 'react'
import { Pane } from 'evergreen-ui'

import { useDispatchActions } from '../../store'
import { useDiories } from '../diograph/utils/useDiories'

import { selectStory } from './navigationActions'

import { MenuDropdown } from '../../components/MenuDropdown'
import { MenuItem } from '../../components/MenuItem'
import { useContextDiories } from '../diograph/utils/useContextDiories'

const NavigationDivider = () => (
  <Pane color="white" fontSize={12} borderRadius={16} paddingRight={6} alignSelf="center">
    /
  </Pane>
)

const DiographNavigation = () => {
  const { story, memories } = useDiories()
  const { stories, context, contexts } = useContextDiories()

  const { dispatch, dispatchAction } = useDispatchActions()
  return (
    <>
      {context && (
        <>
          <MenuDropdown diory={context} diories={contexts} onClick={dispatchAction(selectStory)} />
          <MenuItem {...context} onClick={() => dispatch(selectStory(context))} />
          <NavigationDivider />
        </>
      )}
      {story && (
        <>
          <MenuDropdown diory={story} diories={stories} onClick={dispatchAction(selectStory)} />
          <MenuItem {...story} color="white" pointerEvents="none" />
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

export { DiographNavigation }
