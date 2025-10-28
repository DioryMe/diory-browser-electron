import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import { MenuDropdown } from '../../../components/menu/MenuDropdown'
import { MenuItem } from '../../../components/menu/MenuItem'

const NavigationDivider = () => (
  <Pane color="white" fontSize={12} borderRadius={16} margin={6} alignSelf="center">
    /
  </Pane>
)

const fallbackText = (diory) => ({ ...diory, text: diory.text || diory.date || diory.id })

// TODO Update text
const DiographAddress = ({ story, stories, context, contexts, onClick }) => (
  <>
    {context && (
      <>
        <MenuItem diory={fallbackText(context)} onClick={onClick} />
        <MenuDropdown diory={context} diories={contexts} onClick={onClick} position="right" />
        <NavigationDivider />
      </>
    )}
    {story && (
      <>
        <MenuDropdown diory={story} diories={stories} onClick={onClick} position="left" />
        <MenuItem
          diory={fallbackText(story)}
          color="white"
          pointerEvents="none"
          onClick={onClick}
        />
      </>
    )}
  </>
)

DiographAddress.propTypes = {
  story: PropTypes.object,
  stories: PropTypes.array,
  context: PropTypes.object,
  contexts: PropTypes.array,
  onClick: PropTypes.func,
}

export { DiographAddress }
