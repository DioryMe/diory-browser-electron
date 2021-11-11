import React from 'react'
import { Pane } from 'evergreen-ui'

import { useStore, useDispatchActions } from '../../../store'
import { resetStore } from '../../../store/reducer'
import { toggleSearchBar } from '../../search/actions'
import { getDiograph } from '../../diograph/actions'

import NavigationButtons from './NavigationButtons'
import NavigationLenses from './NavigationLenses'
import Icon from '../../../components/Icon'

const NavigationBar = () => {
  const [{ active }] = useStore((state) => state.search)
  const { dispatch } = useDispatchActions()
  return (
    <Pane
      display="flex"
      justifyContent="space-between"
      padding={8}
      background="tint2"
      zIndex={15}
      position="fixed"
      width="100%"
    >
      <NavigationButtons display="flex" alignSelf="center" />
      <NavigationLenses display="flex" />
      <Pane>
        {/* TODO: A icon is only a svg element and should not have onClick handlers.
        If you need a clickable icon, use IconButton instead.
        https://evergreen.segment.com/components/buttons#icon_buttons */}
        <Icon size={20} icon="filter" marginRight="24px" style={{ cursor: 'hand' }} />
        <Icon
          size={20}
          icon="search"
          marginRight="24px"
          color={active ? 'selected' : ''}
          style={{ cursor: 'hand' }}
          onClick={() => dispatch(toggleSearchBar())}
        />
        <Icon
          size={20}
          icon="cog"
          marginRight="24px"
          style={{ cursor: 'hand' }}
          onClick={() => {
            dispatch(resetStore())
            // Default folderLocation needs to be changed to null
            dispatch(getDiograph({}, undefined, null))
          }}
        />
      </Pane>
    </Pane>
  )
}

export default NavigationBar
