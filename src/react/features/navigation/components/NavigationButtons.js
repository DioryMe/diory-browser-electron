import React from 'react'
import { Pane, IconButton } from 'evergreen-ui'

import { useStore } from '../../../store'
import { goBackward, goForward, selectStory } from '../navigationActions'
import Icon from '../../../components/Icon'
import NavigationContextsPill from './NavigationContextsPill'
import NavigationContextButton from './NavigationContextButton'

const useNavigationButtons = () => {
  const [{ backward, forward }, dispatch] = useStore((state) => state.navigation)
  const [{ rootId }] = useStore((state) => state.diograph)
  return {
    home: {
      onClick: () => dispatch(selectStory({ id: rootId })),
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
      <NavigationContextButton />
      <NavigationContextsPill />
    </Pane>
  )
}

export default NavigationButtons
