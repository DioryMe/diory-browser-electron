import React from 'react'
import { Pane, IconButton } from 'evergreen-ui'
import { useStore } from '../../../store'
import { goBackward, goForward, setFocus } from '../actions'
import Icon from '../../../components/Icon'
import NavigationContextsPill from './NavigationContextsPill'
import NavigationContextButton from './NavigationContextButton'

const useNavigationButtons = () => {
  const [{ backward, forward }, dispatch] = useStore((state) => state.navigation)
  const [{ rootId }] = useStore((state) => state.diograph)
  return {
    home: {
      onClick: () => dispatch(setFocus({ id: rootId })),
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

const NavigationButtons = (props) => {
  const { home, back, forward } = useNavigationButtons()
  return (
    <Pane {...props}>
      <IconButton appearance="minimal" icon={<Icon icon="home" />} data-testid="home" {...home} />
      <NavigationContextButton />
      <NavigationContextsPill />
      <IconButton
        appearance="minimal"
        icon={<Icon icon="arrow-left" />}
        data-testid="navigate-back"
        {...back}
      />
      <IconButton
        appearance="minimal"
        icon={<Icon icon="arrow-right" />}
        data-testid="navigate-forward"
        {...forward}
      />
    </Pane>
  )
}

export default NavigationButtons
