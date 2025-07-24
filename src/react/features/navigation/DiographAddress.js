import React from 'react'
import { Pane } from 'evergreen-ui'

import PropTypes from 'prop-types'
import { MenuDropdown } from '../../components/MenuDropdown'
import { MenuItem } from '../../components/MenuItem'

const NavigationDivider = () => (
  <Pane color="white" fontSize={12} borderRadius={16} margin={6} alignSelf="center">
    /
  </Pane>
)

// TODO Update text
const DiographAddress = ({ home, story, stories, context, contexts, onClick }) => (
  <>
    <MenuItem diory={home} fontWeight="bold" onClick={onClick} />
    <NavigationDivider />
    {context && (
      <>
        <MenuItem diory={context} onClick={onClick} />
        <MenuDropdown diory={context} diories={contexts} onClick={onClick} position="right" />
        <NavigationDivider />
      </>
    )}
    {story && (
      <>
        <MenuDropdown diory={story} diories={stories} onClick={onClick} position="left" />
        <MenuItem diory={story} color="white" pointerEvents="none" onClick={onClick} />
      </>
    )}
  </>
)

DiographAddress.propTypes = {
  home: PropTypes.string,
  story: PropTypes.object,
  stories: PropTypes.array,
  context: PropTypes.object,
  contexts: PropTypes.array,
  onClick: PropTypes.func,
}

export { DiographAddress }
