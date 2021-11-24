import React from 'react'

import { Heading, IconButton, Pane, TextInputField } from 'evergreen-ui'
import { useDispatchActions, useStore } from '../../store'
import { useSetDioryFolderLocation } from './useSetDioryFolderLocation'

import { toggleSettingsBar } from './actions'

import Icon from '../../components/Icon'
import SettingsBar from './Bar'

const Settings = () => {
  const [{ dioryFolderLocation, showSettingsBar }] = useStore((state) => state.settings)
  const { dispatchAction } = useDispatchActions()
  const { onClick } = useSetDioryFolderLocation()
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
      <TextInputField label="Diory location" defaultValue={dioryFolderLocation} onClick={onClick} />
    </SettingsBar>
  ) : null
}

export default Settings
