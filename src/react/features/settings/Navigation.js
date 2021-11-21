import React from 'react'
import { IconButton, Pane } from 'evergreen-ui'

import { useDispatchActions } from '../../store'

import { toggleSettingsBar } from './actions'

import Icon from '../../components/Icon'

const SettingsNavigation = (props) => {
  const { dispatchAction } = useDispatchActions()
  return (
    <Pane {...props}>
      <IconButton
        appearance="minimal"
        icon={<Icon icon="menu" />}
        onClick={dispatchAction(toggleSettingsBar)}
        data-testid="settings-button"
      />
    </Pane>
  )
}

export default SettingsNavigation
