import React from 'react'
import { Pane, IconButton } from 'evergreen-ui'
import { useDiorys } from '../../hooks'
import { useStore } from '../../store'
import { goHome, goBackward, goForward } from '../../actions/navigation'

const useNavigationButtons = () => {
  const [{ backward, forward }, dispatch] = useStore(state => state.navigation)
  const { diorys: backwardDiorys } = useDiorys(backward)
  const { diorys: forwardDiorys } = useDiorys(forward)
  return {
    home: {
      onClick: () => dispatch(goHome()),
    },
    back: {
      diorys: backwardDiorys,
      disabled: !backwardDiorys.length,
      onClick: () => dispatch(goBackward()),
    },
    forward: {
      diorys: forwardDiorys,
      disabled: !forwardDiorys.length,
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
