import React from 'react'
import { Pane } from 'evergreen-ui'

import { MenuDropdown } from '../../components/MenuDropdown'
import { MenuItem } from '../../components/MenuItem'

const NavigationDivider = () => (
  <Pane color="white" fontSize={12} borderRadius={16} margin={6} alignSelf="center">
    /
  </Pane>
)

// TODO Update text
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
        <MenuItem diory={story} color="white" pointerEvents="none" onClick={onClick} />
        <MenuDropdown diory={story} diories={stories} onClick={onClick} />
      </>
    )}

    {memories && (
      <>
        <NavigationDivider />
        <MenuDropdown diories={memories} onClick={onClick} />
      </>
    )}
  </>
)

export { DiographAddress }
