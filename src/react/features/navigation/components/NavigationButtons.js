import React from 'react'
import { Pane, IconButton } from 'evergreen-ui'
import { useStore } from '../../../store'
import { goHome, goBackward, goForward } from '../actions'
import { selectLens } from '../../lenses/actions'
import Icon from '../../../components/Icon'

const useNavigationButtons = () => {
  const [{ backward, forward }, dispatch] = useStore((state) => state.navigation)
  return {
    home: {
      onClick: () => {
        dispatch(goHome())
        dispatch(selectLens('grid'))
      },
    },
    back: {
      disabled: !backward.length,
      onClick: () => {
        dispatch(goBackward())
        dispatch(selectLens(backward[0].lens))
      },
    },
    forward: {
      disabled: !forward.length,
      onClick: () => {
        dispatch(goForward())
        dispatch(selectLens(forward[0].lens))
      },
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
    </Pane>
  )
}

export default NavigationButtons
