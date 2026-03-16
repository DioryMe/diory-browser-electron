import React from 'react'
import PropTypes from 'prop-types'

import { MenuDropdown } from '../../../components/menu/MenuDropdown'
import { MenuItem } from '../../../components/menu/MenuItem'
import { NavigationDivider } from './NavigationDivider'

const fallbackText = (diory) => ({ ...diory, text: diory.text || diory.date || diory.id })

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
