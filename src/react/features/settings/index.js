import React from 'react'

import { Heading, IconButton, Pane, TextInputField } from 'evergreen-ui'
import { useDispatchActions, useStore } from '../../store'
import { useSetDioryLocation } from './useSetDioryLocation'

import { toggleSettingsBar } from './actions'

import Icon from '../../components/Icon'
import SettingsBar from './Bar'

const Settings = () => {
  const [{ dioryLocation, showSettingsBar }] = useStore((state) => state.settings)
  const { dispatchAction } = useDispatchActions()
  const { onClick } = useSetDioryLocation()
  return showSettingsBar ? (
    <SettingsBar>
      <Pane display="flex" justifyContent="space-between">
        <Heading size={900} paddingBottom={36} lineHeight={1}>
          Diory
        </Heading>
        <IconButton
          float="right"
          appearance="minimal"
          icon={<Icon icon="cross" />}
          onClick={dispatchAction(toggleSettingsBar)}
          data-testid="search-close"
        />
      </Pane>
      <TextInputField label="Diory location" defaultValue={dioryLocation} onClick={onClick} />
    </SettingsBar>
  ) : null
}

export default Settings
