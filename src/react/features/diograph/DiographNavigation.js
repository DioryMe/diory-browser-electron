import React from 'react'
import PropTypes from 'prop-types'

import { NavigationBar } from '../navigation/components/NavigationBar'
import { DiographAddress } from './components/DiographAddress'
import { NavigationContent } from '../navigation/components/NavigationContent'
import { SidePanelToggleButton } from '../sidePanel/components/SidePanelToggleButton'
import { MenuItem } from '../../components/menu/MenuItem'

const DiographNavigation = ({ home, story, stories, context, contexts, onClick }) => (
  <NavigationBar>
    <NavigationContent>
      <SidePanelToggleButton side="left" />
      <MenuItem diory={home} fontWeight="bold" onClick={onClick} />
    </NavigationContent>
    <NavigationContent>
      <DiographAddress
        story={story}
        stories={stories}
        context={context}
        contexts={contexts}
        onClick={onClick}
      />
    </NavigationContent>
    <NavigationContent>
      <SidePanelToggleButton side="right" />
    </NavigationContent>
  </NavigationBar>
)

DiographNavigation.propTypes = {
  story: PropTypes.object,
  stories: PropTypes.array,
  context: PropTypes.object,
  contexts: PropTypes.array,
  onClick: PropTypes.func,
}

export { DiographNavigation }
