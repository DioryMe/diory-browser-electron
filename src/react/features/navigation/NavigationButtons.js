import React from 'react'
import { Pane, IconButton } from 'evergreen-ui'
import { useStore } from '../../store'
import { goHome, goBackward, goForward } from './actions'

const useNavigationButtons = () => {
  const [{ backward, forward }, dispatch] = useStore(state => state.navigation)
  return {
    home: {
      onClick: () => dispatch(goHome()),
    },
    back: {
      disabled: !backward.length,
      onClick: () => dispatch(goBackward()),
    },
    forward: {
      disabled: !forward.length,
      onClick: () => dispatch(goForward()),
    },
  }
}

const NavigationButtons = props => {
  const { home, back, forward } = useNavigationButtons()
  return (
    <Pane {...props}>
      <IconButton appearance="minimal" icon="home" {...home} />
      <IconButton appearance="minimal" icon="arrow-left" {...back} />
      <IconButton appearance="minimal" icon="arrow-right" {...forward} />
    </Pane>
  )
}

export default NavigationButtons
