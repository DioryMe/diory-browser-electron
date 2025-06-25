import React from 'react'
import { Pane } from 'evergreen-ui'

import { MenuDropdown } from '../../components/MenuDropdown'
import { MenuItem } from '../../components/MenuItem'

const NavigationDivider = () => (
  <Pane color="white" fontSize={12} borderRadius={16} margin={6} alignSelf="center">
    /
  </Pane>
)

const DiographAddress = ({ home, story, stories, context, contexts, memories, onClick }) => (
  <>
    <MenuItem diory={home} fontWeight="bold" onClick={onClick} />
    <NavigationDivider />
    {context && (
      <>
        <MenuItem diory={context} onClick={onClick} />
        <MenuDropdown diory={context} diories={contexts} onClick={onClick} />
        <NavigationDivider />
      </>
    )}
    {story && (
      <>
        <MenuItem diory={story} color="white" pointerEvents="none" />
        <MenuDropdown diory={story} diories={stories} onClick={onClick} />
      </>
    )}

    {memories.length > 1 && (
      <>
        <NavigationDivider />
        <MenuDropdown diories={memories} onClick={onClick} />
      </>
    )}
  </>
)

export { DiographAddress }
