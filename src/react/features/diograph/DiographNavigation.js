import React from 'react'

import { NavigationBar } from '../navigation/components/NavigationBar'
import { DiographAddress } from './components/DiographAddress'
import { NavigationContent } from '../navigation/components/NavigationContent'
import { SidePanelToggleButton } from '../sidePanel/components/SidePanelToggleButton'
import PropTypes from 'prop-types'

const DiographNavigation = ({ story, stories, context, contexts, onClick }) => {
  return (
    <NavigationBar>
      <NavigationContent>
        <SidePanelToggleButton side="left" />
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
}

DiographNavigation.propTypes = {
  story: PropTypes.object,
  stories: PropTypes.array,
  context: PropTypes.object,
  contexts: PropTypes.array,
  onClick: PropTypes.func,
}

export { DiographNavigation }
