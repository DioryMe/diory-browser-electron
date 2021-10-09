import React from 'react'
import { Pane } from 'evergreen-ui'

import { useStore, useDispatchActions } from '../../../store'
import { toggleSearchBar } from '../../search/actions'
import { setFocus } from '../actions'
import { useParent } from '../hooks/useGoSide'

import NavigationButtons from './NavigationButtons'
import NavigationLenses from './NavigationLenses'
// import TextFilter from '../../filters/text/TextFilter'
import Icon from '../../../components/Icon'

const NavigationBar = () => {
  const [{ roomId }] = useStore((state) => state.navigation)
  const [{ active }] = useStore((state) => state.search)
  const parent = useParent()

  const { dispatch } = useDispatchActions()
  const goBack = () => {
    dispatch(setFocus(parent))
  }

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
      {parent && <Pane onClick={goBack}>{parent.text}</Pane>}
      {roomId && <NavigationLenses display="flex" />}
      {roomId && (
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
          <Icon size={20} icon="cog" marginRight="24px" style={{ cursor: 'hand' }} />
        </Pane>
      )}
      {/* roomId && <TextFilter /> */}
    </Pane>
  )
}

export default NavigationBar
